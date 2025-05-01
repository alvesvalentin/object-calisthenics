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