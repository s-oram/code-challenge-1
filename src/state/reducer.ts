import { State } from './state';
import { Command } from '../types/commands';
import { UnreachableCaseError } from '../utils/unreachable-case-error';
import { Table } from '../types/table';
import { EntityPosition } from '../types/entity';


// The reducer function is simplified example of what might be used in a real application.
//
// 1. The `Command` type here only represents user initiated actions, which obviously wouldn't
//    be the case in a real application. Therefore, I would replace the `Command` type used
//    here with a new `Action` type. User commands would be a subset of all possible actions.
//
// 2. The `state` value is an immutable value. I would consider using "Immer" to  ensure the
//    `state` wasn't inadvertently modified.
//    https://github.com/immerjs/immer
//
// 3. The pacman commands are all synchronous & side-effect free, which makes it easy to
//    write a reducer. A real application would likely include asynchronous actions and
//    side effects. To make this kind of code easier to maintain I would consider using
//    something similar to redux-thunk.

export const reduce = (state: State, command: Command): State => {

    switch (command.type) {
        case 'PLACE': {
            if (Table.isPositionInsideBounds(state.table, command.x, command.y)) {
                return {
                    ...state,
                    pacman: {
                        position: {
                            x: command.x,
                            y: command.y,
                            facing: command.facing,
                        },
                    },
                };
            } else {
                return state;
            }
        }

        case 'MOVE_FORWARD': {
            if (state.pacman.position === null) {
                return state;
            } else {
                const newPosition = EntityPosition.moveForward(state.pacman.position);
                if (Table.isPositionInsideBounds(state.table, newPosition.x, newPosition.y)) {
                    return {
                        ...state,
                        pacman: {
                            position: newPosition,
                        },
                    };
                } else {
                    return state;
                }
            }
        }

        case 'ROTATE_LEFT': {
            if (state.pacman.position === null) {
                return state;
            } else {
                const newPosition = EntityPosition.rotateLeft(state.pacman.position);
                return {
                    ...state,
                    pacman: {
                        position: newPosition,
                    },
                };
            }
        }

        case 'ROTATE_RIGHT': {
            if (state.pacman.position === null) {
                return state;
            } else {
                const newPosition = EntityPosition.rotateRight(state.pacman.position);
                return {
                    ...state,
                    pacman: {
                        position: newPosition,
                    },
                };
            }
        }

        case 'REPORT_POSITION': {
            return state;
        }

        default:
            throw new UnreachableCaseError(command);
    }

};
