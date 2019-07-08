import { EntityPosition } from '../types/entity';
import { Table } from '../types/table';
import { tableWidth, tableHeight } from '../constants';

export interface State {
    table: Table;
    robot: {
        position: null | EntityPosition;
    };
}

export const initialState = (): State => {
    return {
        table: {
            width: tableWidth,
            height: tableHeight,
        },
        robot: {
            position: null,
        },
    };
};
