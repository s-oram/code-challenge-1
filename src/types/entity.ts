export type EntityDirection = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export interface EntityPosition {
    x: number;
    y: number;
    facing: EntityDirection;
}
