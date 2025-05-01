class Axis {
    private constructor(public value: number) {}

    static specifyAxis(value: number) {
        return new Axis(value);
    }

    provideValue() {
        return this.value;
    }


}

export class Rover {
    private constructor(private xCoordinate: Axis, private yCoordinate: Axis, private direction: string) {

    }

    static create(xCoordinate: number, yCoordinate: number, direction: string) {
        const xAxis = Axis.specifyAxis(xCoordinate);
        const yAxis = Axis.specifyAxis(yCoordinate);
        return new Rover(xAxis, yAxis, direction);
    }


    execute(command: string) {

        this.validateCommand(command);

        const instructions = this.splitCommandIntoInstructions(command);

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
        if (this.xCoordinate.provideValue() >= 5) {
            this.xCoordinate.value = 0
        }

        if (this.xCoordinate.provideValue() == -1) {
            this.xCoordinate.value = 4
        }

        if (this.yCoordinate.provideValue() >= 5) {
            this.yCoordinate.value = 0
        }

        if (this.yCoordinate.provideValue() == -1) {
            this.yCoordinate.value = 4
        }
    }

    private rotateLeft(instruction: string) {
        if (instruction === 'L') {
            switch (this.direction) {
                case 'N':
                    this.direction = 'W'
                    break;

                case 'E':
                    this.direction = 'N'
                    break;
                case 'S':
                    this.direction = 'E'
                    break;
                case 'W':
                    this.direction = 'S'
                    break;
            }
        }
    }

    private rotateRight(instruction: string) {
        if (instruction === 'R') {
            switch (this.direction) {
                case 'N':
                    this.direction = 'E'
                    break;
                case 'E':
                    this.direction = 'S'
                    break;
                case 'S':
                    this.direction = 'W'
                    break;
                case 'W':
                    this.direction = 'N'


            }
        }
    }

    private moveWest(instruction: string) {
        if (instruction === 'M' && this.direction === 'W') {
            this.xCoordinate.value--
        }
    }

    private moveEast(instruction: string) {
        if (instruction === 'M' && this.direction === 'E') {
            this.xCoordinate.value++
        }
    }

    private moveSouth(command: string) {
        if (command === 'M' && this.direction === 'S') {
            this.yCoordinate.value--
        }
    }

    private moveNorth(command: string) {
        if (command === 'M' && this.direction === 'N') {
            this.yCoordinate.value++
        }
    }

    private splitCommandIntoInstructions(command: string) {
        return command.split('');
    }

    private validateCommand(command: string) {

        const validInstructions = ['M', 'R', 'L'];
        if (validInstructions.every(c => !command.includes(c))) {
            throw new Error(`Unknown command: ${command}`)
        }
    }

    getPosition() {
        return {
            x: this.xCoordinate.value,
            y: this.yCoordinate.value,
            direction: this.direction
        };
    }
}