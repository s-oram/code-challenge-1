import { EntityDirection } from './entity';

export interface PlaceCommand {
    type: 'PLACE';
    x: number;
    y: number;
    facing: EntityDirection;
}

export interface MoveForwardCommand {
    type: 'MOVE_FORWARD';
}

export interface RotateLeftCommand {
    type: 'ROTATE_LEFT';
}

export interface RotateRightCommand {
    type: 'ROTATE_RIGHT';
}

export interface ReportPositionCommand {
    type: 'REPORT_POSITION';
}

export type Command =
    | PlaceCommand
    | MoveForwardCommand
    | RotateLeftCommand
    | RotateRightCommand
    | ReportPositionCommand;
