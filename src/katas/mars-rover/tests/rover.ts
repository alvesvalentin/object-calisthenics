class Axis {
    private constructor(public value: number) {}

    static specifyAxis(value: number): Axis {
        return new Axis(value);
    }

    provideValue(): number {
        return this.value;
    }

    //TODO revoir le nommage car pas proche du métier
    increment() {
        return new Axis(this.value + 1);
    }

    decrement() {
        return new Axis(this.value - 1);
    }

    looped(max: number): Axis {
        let newValue = this.value;

        if (this.value >= max) {
            newValue = 0;
        } else if (this.value < 0) {
            newValue = max - 1;
        }

        return new Axis(newValue);
    }
}

export class Command {
    private constructor(public value: string) {
        this.validateCommand();
    }

    static specifyCommand(value: string): Command {
        return new Command(value);
    }

    provideInstructions(): string[] {
        return this.value.split('');
    }

    private validateCommand() {
        const validInstructions = ['M', 'R', 'L'];
        if (validInstructions.every(ValidInstruction => !this.value.includes(ValidInstruction))) {
            throw new Error(`Unknown command: ${this.value}`)
        }
    }
}

enum Direction {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'W'
}

namespace Direction {
    export function fromString(value: string): Direction {
        const direction = Object.values(Direction).find(direction => direction === value) as Direction;
        if (!direction) {
            throw new Error(`Invalid direction: ${value}`);
        }
        return direction;
    }

    export function rotateRight(direction: Direction): Direction {
        switch (direction) {
            case Direction.NORTH: return Direction.EAST;
            case Direction.EAST: return Direction.SOUTH;
            case Direction.SOUTH: return Direction.WEST;
            case Direction.WEST: return Direction.NORTH;
        }
    }
}


export class Rover {
     readonly PLANET_SIZE: number = 5;

    private constructor(private xAxis: Axis, private yAxis: Axis, private direction: Direction) {}

    static create(xValue: number, yValue: number, direction: string) {
        const xAxis = Axis.specifyAxis(xValue);
        const yAxis = Axis.specifyAxis(yValue);
        return new Rover(xAxis, yAxis, Direction.fromString(direction));
    }


    execute(command: Command) {

        const instructions = command.provideInstructions();

        this.processInstructions(instructions);
    }

    private processInstructions(instructions: string[]) {
        instructions.forEach(instruction => {
            this.moveNorth(instruction);

            this.moveSouth(instruction);

            this.moveEast(instruction);

            this.moveWest(instruction);

            this.rotateRight(instruction);

            this.rotateLeft(instruction);

            this.checkBounds();
        })
    }

    private checkBounds() {
        this.xAxis = this.xAxis.looped(this.PLANET_SIZE);
        this.yAxis = this.yAxis.looped(this.PLANET_SIZE);
    }

    private rotateLeft(instruction: string) {
        if (instruction === 'L') {
            switch (this.direction) {
                case 'N':
                    this.direction = Direction.fromString('W')
                    break;

                case 'E':
                    this.direction = Direction.fromString('N')
                    break;
                case 'S':
                    this.direction = Direction.fromString('E')
                    break;
                case 'W':
                    this.direction = Direction.fromString('S')
                    break;
            }
        }
    }

    private rotateRight(instruction: string) {
        if (instruction === 'R') {
            switch (this.direction) {
                case 'N':
                    this.direction = Direction.fromString('E')
                    break;
                case 'E':
                    this.direction = Direction.fromString('S')
                    break;
                case 'S':
                    this.direction = Direction.fromString('W')
                    break;
                case 'W':
                    this.direction = Direction.fromString('N')


            }
        }
    }

    private moveWest(instruction: string) {
        if (instruction === 'M' && this.direction === 'W') {
            this.xAxis = this.xAxis.decrement();
        }
    }

    private moveEast(instruction: string) {
        if (instruction === 'M' && this.direction === 'E') {
            this.xAxis = this.xAxis.increment();
        }
    }

    private moveSouth(command: string) {
        if (command === 'M' && this.direction === 'S') {
            this.yAxis = this.yAxis.decrement();
        }
    }

    private moveNorth(command: string) {
        if (command === 'M' && this.direction === Direction.NORTH) {
            this.yAxis = this.yAxis.increment();
        }
    }

    getPosition() {
        return {
            x: this.xAxis.value,
            y: this.yAxis.value,
            direction: this.direction
        };
    }
}