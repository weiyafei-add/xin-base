/**
 * @type {import("rollup").RollupOptions}
 */
import typescript from '@rollup/plugin-typescript';
export default {
    input: './src/index.ts',
    output: {
        dir: 'lib',
        format: 'es',
        exports: 'named'
    },
    external: ['axios'],
    plugins: [typescript({
        outDir: 'lib'
    })]
}