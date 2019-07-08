export interface Table {
    width: number;
    height: number;
}

export namespace Table {
    export function isPositionInsideBounds(table: Table, x: number, y: number): boolean {
        return (x >= 0 && x < table.width && y >= 0 && y < table.height);
    }
}

