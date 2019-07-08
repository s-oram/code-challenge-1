import { parseScript } from './parse-script';
import { ScriptStatement } from '../types/script-statements';

xdescribe('parseScript', () => {
    it('should return an array of script statements', () => {
        const script = [
            '// Example A',
            '',
            'MOVE',
            'REPORT',
            'UNKNOWN_COMMAND',
        ];

        const scriptStatements = parseScript(script);

        const expected: ScriptStatement[] = [
            { type: 'COMMENT', text: 'Example A' },
            { type: 'MOVE_FORWARD' },
            { type: 'REPORT_POSITION' },
            { type: 'SYNTAX_ERROR', line: 5, text: 'UNKNOWN_COMMAND' },
        ];

        expect(scriptStatements).toEqual(expected);
    });
});
