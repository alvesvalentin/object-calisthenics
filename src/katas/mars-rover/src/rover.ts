import {Command} from "./command";
import {Direction} from "./direction";

class Axis {
    private constructor(public value: number) {}

    static specifyAxis(value: number): Axis {
        return new Axis(value);
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
            this.direction = Direction.rotateLeft(this.direction)
        }
    }

    private rotateRight(instruction: string) {
        if (instruction === 'R') {
            this.direction = Direction.rotateRight(this.direction)
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