import { repeatStr } from './repeat-str';

describe('repeatStr', () => {
    it('should create a string of the correct length', () => {
        const output = repeatStr('x', 4);
        expect(output.length).toEqual(4);
    });
});
