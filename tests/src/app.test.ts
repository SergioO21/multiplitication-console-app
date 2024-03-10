
import {ServerApp} from "../../src/presentation";

describe('Test App.ts', () => {

    test('Should call Server.run with values', async () => {

    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
        'node', 'app.ts',
        '-b', '4',
        '-l', '15',
        '-s',
        '-n', 'testing-app',
        '-d', 'test-path',
    ];

    await import ('../../src/app');

    expect( serverRunMock ).toHaveBeenCalledWith({
        base: 4,
        limit: 15,
        showTable: true,
        fileName: 'testing-app',
        filePath: 'test-path',
    });
    });
});
