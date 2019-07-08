import { State } from './state';
import { Command } from '../types/commands';
import { UnreachableCaseError } from '../utils/unreachable-case-error';

export const reduce = (state: State, command: Command): State => {

    switch (command.type) {
        case 'PLACE':
            return state;

        case 'MOVE_FORWARD':
            return state;

        case 'ROTATE_LEFT':
            return state;

        case 'ROTATE_RIGHT':
            return state;

        case 'REPORT_POSITION':
            return state;

        default:
            throw new UnreachableCaseError(command);
    }

};
