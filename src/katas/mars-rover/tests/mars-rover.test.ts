import {Rover} from "./rover";

describe('MarsRover', () => {

    it('should correctly return the current position and direction of the rover', () => {
        const rover = Rover.create(1, 2, 'E');
        expect(rover.getPosition()).toEqual({x: 1, y: 2, direction: 'E'});
    });

    it('should move the rover forward when facing North', () => {
        const rover = Rover.create(0, 0, 'N');
        rover.execute('M');
        expect(rover.getPosition()).toEqual({x: 0, y: 1, direction: 'N'});
    });

    it.each([
        {from: 'N', to: 'E'},
        {from: 'E', to: 'S'},
        {from: 'S', to: 'W'},
        {from: 'W', to: 'N'}
    ])('should turn the rover to the right from $from to $to when command is R', ({from, to}) => {
        const rover = Rover.create(0, 0, from);
        rover.execute('R');
        expect(rover.getPosition()).toEqual({x: 0, y: 0, direction: to});
    });

    it.each([
        {from: 'N', to: 'W'},
        {from: 'W', to: 'S'},
        {from: 'S', to: 'E'},
        {from: 'E', to: 'N'}
    ])('should turn the rover to the left from $from to $to when command is L', ({from, to}) => {
        const rover = Rover.create(0, 0, from);
        rover.execute('L');
        expect(rover.getPosition()).toEqual({x: 0, y: 0, direction: to});
    });

    it('should navigate a complex set of movements', () => {
        const rover = Rover.create(0, 0, 'N');
        rover.execute('MMRMMRMRRM');
        expect(rover.getPosition()).toEqual({x: 2, y: 2, direction: 'N'});
    });

    it.each([
        {start: {x: 0, y: 0, direction: 'N'}, commands: 'MMMMM', expected: {x: 0, y: 0, direction: 'N'}},
        {start: {x: 4, y: 4, direction: 'E'}, commands: 'MMMMM', expected: {x: 4, y: 4, direction: 'E'}},
        {start: {x: 0, y: 4, direction: 'W'}, commands: 'MMMM', expected: {x: 1, y: 4, direction: 'W'}},
        {start: {x: 2, y: 2, direction: 'S'}, commands: 'MMMMMM', expected: {x: 2, y: 1, direction: 'S'}},
    ])('should wrap around the grid if the rover moves out of bounds', ({start, commands, expected}) => {
        const rover = Rover.create(start.x, start.y, start.direction);
        rover.execute(commands);
        expect(rover.getPosition()).toEqual(expected);
    });

    it('should handle unknown commands gracefully', () => {
        const rover = Rover.create(0, 0, 'N');
        expect(() => rover.execute('X')).toThrowError('Unknown command: X');
    });
});