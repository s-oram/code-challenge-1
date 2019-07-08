import path from 'path';
import { readScriptFile } from './read-script-file';

describe('readScriptFile', () => {
    fit('should return an array of strings', () => {
        const testDir = path.join(__dirname, '..', '..', 'robot-scripts-test');
        const testFile = path.join(testDir, 'Example-A.txt');
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
