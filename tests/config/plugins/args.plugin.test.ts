
const runCommand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];
    const { argv } = await import('../../../src/config/plugins');

    return argv;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async () => {

        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
            d: 'outputs',
        }));
    });

    test('Should return configuration with custom values', async () => {
        const argv = await runCommand([
            '-b', '7',
            '-l', '25',
            '-s',
            '-n', 'testing-table',
            '-d', 'testing/tables',
        ]);

        expect(argv).toEqual( expect.objectContaining({
            b: 7,
            l: 25,
            s: true,
            n: 'testing-table',
            d: 'testing/tables',
        }));
    });
});
