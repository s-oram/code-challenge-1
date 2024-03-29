import { initialState, State } from './state';
import { reduce } from './reducer';
import { Command } from '../types/commands';
import { tableWidth, tableHeight } from '../constants';

describe('Reducer', () => {

    it('PlaceCommand should place the pacman on the table', () => {
        const command: Command = { type: 'PLACE', x: 1, y: 2, facing: 'NORTH' };
        const state = reduce(initialState(), command);
        expect(state.pacman.position).toEqual({x: 1, y: 2, facing: 'NORTH' });
    });

    it('Invalid PlaceCommand should have no effect', () => {
        const commandA: Command = { type: 'PLACE', x: tableWidth, y: 0, facing: 'NORTH' };
        const stateA = reduce(initialState(), commandA);
        expect(stateA.pacman.position).toEqual(null);

        const commandB: Command = { type: 'PLACE', x: 0, y: tableHeight, facing: 'NORTH' };
        const stateB = reduce(initialState(), commandB);
        expect(stateB.pacman.position).toEqual(null);
    });

    it('ReportPosition command should have no effect', () => {
        let state = initialState();
        state = reduce(state, { type: 'REPORT_POSITION'});
        expect(state).toEqual(state);
    });

    it('Move commands issued while the pacman is off the table should have no effect', () => {
        let state = initialState();
        state = reduce(state, { type: 'MOVE_FORWARD' });
        state = reduce(state, { type: 'ROTATE_LEFT' });
        state = reduce(state, { type: 'ROTATE_LEFT' });
        state = reduce(state, { type: 'ROTATE_RIGHT' });
        expect(state).toEqual(state);
    });

    it('MoveForward command should move the pacman', () => {
        let state: State;

        state = reduce(initialState(), { type: 'PLACE', x: 1, y: 2, facing: 'NORTH' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 1, y: 3, facing: 'NORTH' });

        state = reduce(initialState(), { type: 'PLACE', x: 1, y: 2, facing: 'SOUTH' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 1, y: 1, facing: 'SOUTH' });

        state = reduce(initialState(), { type: 'PLACE', x: 1, y: 2, facing: 'EAST' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 2, y: 2, facing: 'EAST' });

        state = reduce(initialState(), { type: 'PLACE', x: 1, y: 2, facing: 'WEST' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 0, y: 2, facing: 'WEST' });
    });

    it('MoveForword command should not move the pacman beyond the table bounds', () => {
        let state: State;

        state = reduce(initialState(), { type: 'PLACE', x: 0, y: 0, facing: 'SOUTH' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 0, y: 0, facing: 'SOUTH' });

        state = reduce(initialState(), { type: 'PLACE', x: 0, y: 0, facing: 'WEST' });
        state = reduce(state, { type: 'MOVE_FORWARD' });
        expect(state.pacman.position).toEqual({ x: 0, y: 0, facing: 'WEST' });
    });

    it('RotateLeft command should rotate the pacman', () => {
        let state: State;

        state = reduce(initialState(), { type: 'PLACE', x: 0, y: 0, facing: 'SOUTH' });
        state = reduce(state, { type: 'ROTATE_LEFT' });
        expect(state.pacman.position).toEqual({ x: 0, y: 0, facing: 'EAST' });
    });

    it('RotateRight command should rotate the pacman', () => {
        let state: State;

        state = reduce(initialState(), { type: 'PLACE', x: 0, y: 0, facing: 'SOUTH' });
        state = reduce(state, { type: 'ROTATE_RIGHT' });
        expect(state.pacman.position).toEqual({ x: 0, y: 0, facing: 'WEST' });
    });

});
