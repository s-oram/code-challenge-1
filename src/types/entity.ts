import { UnreachableCaseError } from '../utils/unreachable-case-error';

export type EntityDirection = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export function isEntityDirection(value: any): value is EntityDirection {
    switch (value) {
        case 'NORTH':
        case 'SOUTH':
        case 'EAST':
        case 'WEST':
            return true;
        default:
            return false;
    }
}

export interface EntityPosition {
    x: number;
    y: number;
    facing: EntityDirection;
}

export namespace EntityPosition {
    export function moveForward(current: EntityPosition): EntityPosition {
        switch (current.facing) {
            case 'NORTH': return { ...current, y: current.y + 1};
            case 'SOUTH': return { ...current, y: current.y - 1 };
            case 'EAST': return { ...current, x: current.x + 1 };
            case 'WEST': return { ...current, x: current.x - 1 };
            default:
                throw new UnreachableCaseError(current.facing);
        }
    }

    export function rotateLeft(current: EntityPosition): EntityPosition {
        switch (current.facing) {
            case 'NORTH': return { ...current, facing: 'WEST' };
            case 'SOUTH': return { ...current, facing: 'EAST' };
            case 'EAST': return { ...current, facing: 'NORTH' };
            case 'WEST': return { ...current, facing: 'SOUTH' };
            default:
                throw new UnreachableCaseError(current.facing);
        }
    }

    export function rotateRight(current: EntityPosition): EntityPosition {
        switch (current.facing) {
            case 'NORTH': return { ...current, facing: 'EAST' };
            case 'SOUTH': return { ...current, facing: 'WEST' };
            case 'EAST': return { ...current, facing: 'SOUTH' };
            case 'WEST': return { ...current, facing: 'NORTH' };
            default:
                throw new UnreachableCaseError(current.facing);
        }
    }
}
