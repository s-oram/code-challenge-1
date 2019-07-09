import os from 'os';
import { readScriptFile } from './utils/read-script-file';
import { parseScript } from './utils/parse-script';
import { ScriptStatement } from './types/script-statements';
import { repeatStr } from './utils/repeat-str';
import { initialState, State } from './state/state';
import { UnreachableCaseError } from './utils/unreachable-case-error';
import { reduce } from './state/reducer';

export class App {

    private _state: State = initialState();

    public executeScript(filename: string): string {
        const script = readScriptFile(filename);
        const statements = parseScript(script);
        const errors = statements.filter(x => x.type === 'SYNTAX_ERROR');

        if (errors.length > 0) {
            const errorMessage = [
                'Errors:',
                ...errors.map(formatSyntaxErrorStatement).map(prependWhitespace(2)),
            ];
            return errorMessage.join(os.EOL);

        } else {
            for (const statement of statements) {
                switch (statement.type) {
                    case 'REPORT_POSITION':
                        return getRobotPosition(this._state);

                    case 'COMMENT':
                        // Do nothing.
                        break;

                    case 'SYNTAX_ERROR':
                        throw new Error('Syntax errors should not allow the script to be processed.');

                    case 'PLACE':
                    case 'MOVE_FORWARD':
                    case 'ROTATE_LEFT':
                    case 'ROTATE_RIGHT':
                        this._state = reduce(this._state, statement);
                        break;

                    default:
                        throw new UnreachableCaseError(statement);
                }
            }
            return 'No result';
        }
    }

}

const formatSyntaxErrorStatement = (statement: ScriptStatement): string => {
    if (statement.type === 'SYNTAX_ERROR') {
        return `Syntax error at line ${statement.lineNumber}. Found "${statement.text}"`;
    } else {
        throw new Error(`Unexpected type received: ${statement.type}`);
    }
};

const prependWhitespace = (count: number) => (value: string) => {
    return repeatStr(' ', count) + value;
};

const getRobotPosition = (state: State): string => {
    return state.robot.position === null
        ? 'Robot is not on table'
        : `${state.robot.position.x},${state.robot.position.y},${state.robot.position.facing}`;
};
