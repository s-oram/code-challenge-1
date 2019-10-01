import path from 'path';
import os from 'os';
import { App } from './app';

describe('Application', () => {

    it('should correctly process example A', () => {

        const dir = path.join(__dirname, '..', 'pacman-scripts');
        const filename = path.join(dir, 'Example-A.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('0,1,NORTH');
    });

    it('should correctly process example B', () => {

        const dir = path.join(__dirname, '..', 'pacman-scripts');
        const filename = path.join(dir, 'Example-B.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('0,0,WEST');
    });

    it('should correctly process example C', () => {

        const dir = path.join(__dirname, '..', 'pacman-scripts');
        const filename = path.join(dir, 'Example-C.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('3,3,NORTH');
    });

    it('should correctly process example D', () => {

        const dir = path.join(__dirname, '..', 'pacman-scripts');
        const filename = path.join(dir, 'Example-D.txt');

        const app = new App();
        const output = app.executeScript(filename).split(os.EOL);

        expect(output).toEqual([
            'Errors:',
            '  Syntax error at line 5. Found "UNKNOWN_COMMAND_A"',
            '  Syntax error at line 6. Found "UNKNOWN_COMMAND_B"',
        ]);
    });

    it('should correctly process example E', () => {

        const dir = path.join(__dirname, '..', 'pacman-scripts');
        const filename = path.join(dir, 'Example-E.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('No result');
    });

});
