import { parseScript } from './parse-script';
import { ScriptStatement } from '../types/script-statements';

describe('parseScript', () => {
    it('should return an array of script statements', () => {
        const script = [
            '// Example A',
            '',
            'MOVE',
            'REPORT',
            '',
            'EXPECTED 0,0,NORTH',
            '',
            'UNKNOWN_COMMAND',
        ];

        const scriptStatements = parseScript(script);

        const expected: ScriptStatement[] = [
            { type: 'COMMENT', text: 'Example A' },
            { type: 'MOVE_FORWARD' },
            { type: 'REPORT_POSITION' },
            { type: 'EXPECTED_OUTPUT', x: 0, y: 0, facing: 'NORTH' },
            { type: 'SYNTAX_ERROR', line: 8, text: 'UNKNOWN_COMMAND' },
        ];

        expect(scriptStatements).toEqual(expected);
    });
});
