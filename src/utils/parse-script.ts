import { ScriptStatement } from '../types/script-statements';
import { isEntityDirection } from '../types/entity';

// The parseScript implementation draws inspiration from the "Understanding Parser Combinators"
// blog post at "F# for Fun and Profit".
// https://fsharpforfunandprofit.com/posts/understanding-parser-combinators/

export const parseScript = (script: string[]): ScriptStatement[] => {
    return script
        .map((value): string => value.trim())                            // Trim white space, it's not significant.
        .map((value, index): [number, string] => [index + 1, value])     // Record line numbers for error reporting.
        .filter((value) => value[1] !== '')                              // Remove empty lines as they are ignored.
        .map((value): ScriptStatement => parseLine(value[0], value[1])); // Parse!
};


const parseLine = (lineNumber: number, value: string): ScriptStatement => {

    const allStatementParsers = [
        parsePlaceStatement,
        parseMoveStatement,
        parseLeftStatement,
        parseRightStatement,
        parseReportStatement,
        parseCommentStatement,
    ];

    const result = anyOne(value, allStatementParsers);

    return result !== null
        ? result
        : { type: 'SYNTAX_ERROR', lineNumber: lineNumber, text: value };
};

type StatementParser = (value: string) => ScriptStatement | null;

// Returns the result of the first successful parser. Returns `null` if no parsers are
// successful.
const anyOne = (value: string, parsers: StatementParser[]): ScriptStatement | null => {
    for (const parser of parsers) {
        const statement = parser(value);
        if (statement !== null) {
            return statement;
        }
    }
    return null;
};

const parsePlaceStatement = (value: string): ScriptStatement | null => {
    const regex = /^PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)$/;
    const matchResult = value.match(regex);
    if (matchResult === null) {
        return null;
    }

    const [_, x, y, facing] = matchResult;

    if (!isEntityDirection(facing)) {
        return null;
    }

    return {
        type: 'PLACE',
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        facing: facing,
    };
};

const parseMoveStatement = (value: string): ScriptStatement | null => {
    return (value === 'MOVE')
        ? { type: 'MOVE_FORWARD' }
        : null;
};

const parseLeftStatement = (value: string): ScriptStatement | null => {
    return (value === 'LEFT')
        ? { type: 'ROTATE_LEFT' }
        : null;
};

const parseRightStatement = (value: string): ScriptStatement | null => {
    return (value === 'RIGHT')
        ? { type: 'ROTATE_RIGHT' }
        : null;
};

const parseReportStatement = (value: string): ScriptStatement | null => {
    return (value === 'REPORT')
        ? { type: 'REPORT_POSITION' }
        : null;
};

const parseCommentStatement = (value: string): ScriptStatement | null => {
    return (value.startsWith('//'))
        ? { type: 'COMMENT' }
        : null;
};
