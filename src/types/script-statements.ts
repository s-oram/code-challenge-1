import { EntityDirection } from './entity';

export interface PlaceStatement {
    type: 'PLACE';
    x: number;
    y: number;
    facing: EntityDirection;
}

export interface MoveForwardStatement {
    type: 'MOVE_FORWARD';
}

export interface RotateLeftStatement {
    type: 'ROTATE_LEFT';
}

export interface RotateRightStatement {
    type: 'ROTATE_RIGHT';
}

export interface ReportPositionStatement {
    type: 'REPORT_POSITION';
}

export interface CommentStatement {
    type: 'COMMENT';
}

export interface SyntaxError {
    type: 'SYNTAX_ERROR';
    lineNumber: number; // The line number is one-indexed.
    text: string;
}

export type ScriptStatement =
    | PlaceStatement
    | MoveForwardStatement
    | RotateLeftStatement
    | RotateRightStatement
    | ReportPositionStatement
    | CommentStatement
    | SyntaxError;
