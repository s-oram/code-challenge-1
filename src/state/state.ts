import { EntityPosition } from '../types/entity';

export interface State {
    robot: {
        position: null | EntityPosition;
    };
}

export const initialState = (): State => {
    return {
        robot: {
            position: null,
        },
    };
};
