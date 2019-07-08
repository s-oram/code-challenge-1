import { App } from './app';

describe('Application', () => {
    it('should be creatable', () => {
        const app = new App();
        expect(app).toBeTruthy();
    });
});
