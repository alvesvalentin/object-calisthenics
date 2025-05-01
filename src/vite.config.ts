// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node', // ou 'happy-dom' si tu veux tester du DOM plus tard
    },
});
