export enum Direction {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'W'
}

export namespace Direction {
    export function fromString(value: string): Direction {
        const direction = Object.values(Direction).find(direction => direction === value) as Direction;
        if (!direction) {
            throw new Error(`Invalid direction: ${value}`);
        }
        return direction;
    }

    export function rotateRight(direction: Direction): Direction {
        switch (direction) {
            case Direction.NORTH:
                return Direction.EAST;
            case Direction.EAST:
                return Direction.SOUTH;
            case Direction.SOUTH:
                return Direction.WEST;
            case Direction.WEST:
                return Direction.NORTH;
        }
    }

    export function rotateLeft(direction: Direction): Direction {
        switch (direction) {
            case Direction.NORTH:
                return Direction.WEST
            case Direction.EAST:
                return Direction.NORTH
            case Direction.SOUTH:
                return Direction.EAST
            case Direction.WEST:
                return Direction.SOUTH
        }

    }
}