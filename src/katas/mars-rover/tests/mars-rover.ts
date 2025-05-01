const authorizedCommands = ['M', 'R', 'L'];

export class MarsRover {
    private constructor(private xCoordinate: number, private yCoordinate: number, private direction: string) {

    }

    static create(xCoordinate: number, yCoordinate: number, direction: string) {
        return new MarsRover(xCoordinate, yCoordinate, direction);
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
        if (this.xCoordinate >= 5) {
            this.xCoordinate = 0
        }

        if (this.xCoordinate == -1) {
            this.xCoordinate = 4
        }

        if (this.yCoordinate >= 5) {
            this.yCoordinate = 0
        }

        if (this.yCoordinate == -1) {
            this.yCoordinate = 4
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
            this.xCoordinate--
        }
    }

    private moveEast(instruction: string) {
        if (instruction === 'M' && this.direction === 'E') {
            this.xCoordinate++
        }
    }

    private moveSouth(command: string) {
        if (command === 'M' && this.direction === 'S') {
            this.yCoordinate--
        }
    }

    private moveNorth(command: string) {
        if (command === 'M' && this.direction === 'N') {
            this.yCoordinate++
        }
    }

    private splitCommandIntoInstructions(command: string) {
        return command.split('');
    }

    private validateCommand(command: string) {
        if (authorizedCommands.every(c => !command.includes(c))) {
            throw new Error(`Unknown command: ${command}`)
        }
    }

    getPosition() {
        return {
            x: this.xCoordinate,
            y: this.yCoordinate,
            direction: this.direction
        };
    }
}