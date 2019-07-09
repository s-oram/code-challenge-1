import { App } from './app';
import path from 'path';

describe('Application', () => {

    it('should correctly process example A', () => {

        const dir = path.join(__dirname, '..', '..', 'robot-scripts');
        const filename = path.join(dir, 'Example-A.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('0,1,NORTH');
    });

    it('should correctly process example B', () => {

        const dir = path.join(__dirname, '..', '..', 'robot-scripts');
        const filename = path.join(dir, 'Example-B.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('0,0,WEST');
    });

    it('should correctly process example C', () => {

        const dir = path.join(__dirname, '..', '..', 'robot-scripts');
        const filename = path.join(dir, 'Example-C.txt');

        const app = new App();
        const output = app.executeScript(filename);

        expect(output).toEqual('3,3,NORTH');
    });

});
