import { State } from './state';
import { Command } from '../types/commands';
import { UnreachableCaseError } from '../utils/unreachable-case-error';
import { Table } from '../types/table';


// The reducer function is simplified example of what might be used in a "real" application.
//
// 1. The `Command` type here only represents user initiated actions, which obviously wouldn't
//    be the case in a real application. Therefore, I would replace the `Command` type used
//    here with a new `Action` type.
//
// 2. The `state` value is an immutable value. I would consider using "Immer" to  ensure the
//    `state` wasn't inadvertently modified.
//    https://github.com/immerjs/immer
//
// 3. The toy robot commands are all synchronous & side-effect free, which makes it easy to
//    write a reducer. A real application would likely include asynchrous actions and
//    side effects. To make this kind of code easier to maintain I would consider looking
//    at Redux and it's associated extensions or take inspiration from Elm or possibly Vue.
//    * The Elm Architecture: https://guide.elm-lang.org/architecture/
//    * Vuex Actions: https://vuex.vuejs.org/guide/actions.html

export const reduce = (state: State, command: Command): State => {

    switch (command.type) {
        case 'PLACE': {
            if (Table.isPositionInsideBounds(state.table, command.x, command.y)) {
                return {
                    ...state,
                    robot: {
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
            return state;
        }

        case 'ROTATE_LEFT': {
            return state;
        }

        case 'ROTATE_RIGHT': {
            return state;
        }

        case 'REPORT_POSITION': {
            return state;
        }

        default:
            throw new UnreachableCaseError(command);
    }

};
