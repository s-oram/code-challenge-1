import { initialState } from './state';
import { reduce } from './reducer';
import { Command } from '../types/commands';

describe('Reducer', () => {

    it('should process PlaceCommand', () => {
        const command: Command = { type: 'PLACE', x: 1, y: 2, facing: 'NORTH' };
        const state = reduce(initialState(), command);
        expect(state.robot.position).toEqual({x: 1, y: 2, facing: 'NORTH' });
    });

    it('should process out of bounds PlaceCommand', () => {
        const commandA: Command = { type: 'PLACE', x: 5, y: 0, facing: 'NORTH' };
        const stateA = reduce(initialState(), commandA);
        expect(stateA.robot.position).toEqual(null);
    });

});
