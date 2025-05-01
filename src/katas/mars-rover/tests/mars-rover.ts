export class MarsRover {
    constructor(private xCoordinate: number, private yCoordinate: number, private direction: string) {

    }


    execute(command: string) {

        if (['M', 'R', 'L'].every(c => !command.includes(c))) {
            throw new Error(`Unknown command: ${command}`)
        }

        const commands = command.split('');

        commands.forEach(command => {
            if (command === 'M' && this.direction === 'N') {
                this.yCoordinate++
            }

            if (command === 'M' && this.direction === 'S') {
                this.yCoordinate--
            }

            if (command === 'M' && this.direction === 'E') {
                this.xCoordinate++
            }

            if (command === 'M' && this.direction === 'W') {
                this.xCoordinate--
            }

            if (command === 'R') {
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

            if (command === 'L') {
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

            if (this.xCoordinate >= 5) {
                this.xCoordinate = 0
            }

            if (this.xCoordinate  == -1) {
                this.xCoordinate = 4
            }

            if (this.yCoordinate >= 5) {
                this.yCoordinate = 0
            }

            if (this.yCoordinate  == -1) {
                this.yCoordinate = 4
            }
        })
    }

    getPosition() {
        return {
            x: this.xCoordinate,
            y: this.yCoordinate,
            direction: this.direction
        };
    }
}