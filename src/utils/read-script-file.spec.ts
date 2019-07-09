import path from 'path';
import { readScriptFile } from './read-script-file';

describe('readScriptFile', () => {
    it('should return an array of strings', () => {
        const testDir = path.join(__dirname, '..', '..', 'test-data');
        const testFile = path.join(testDir, 'test-script-a.txt');
        const script = readScriptFile(testFile);
        expect (script).toEqual([
            '// Example A',
            '',
            'PLACE 0,0,NORTH',
            'MOVE',
            'REPORT',
            '',
            '// Expected Output: 0,1,NORTH',
            '',
        ]);
    });
});