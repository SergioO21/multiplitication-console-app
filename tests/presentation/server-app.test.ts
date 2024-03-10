import fs from "fs";
import {CreateTable, SaveFile} from "../../src/domain";
import {ServerApp} from "../../src/presentation";

describe('Server App', () => {

    const options = {
        base: 7,
        limit: 20,
        showTable: false,
        filePath: 'test-path',
        fileName: 'test'
    };

    afterAll(() => {
        fs.rmSync('test-path', { recursive: true });
        jest.resetAllMocks();
    });

    test('Should create ServerApp instance', () => {

        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe( 'function' );

    });


    test('Should run ServerApp with options', () => {

        const logSpy = jest.spyOn( console, 'log' );
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes( 2 );
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('\nFile was created!');

        expect( createTableSpy ).toHaveBeenCalledTimes( 1 );
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes( 1 );
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            filePath: options.filePath,
            fileName: options.fileName,
        });
    });


    test('Should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('7 x 1 = 7');
        const saveFileMock = jest.fn().mockReturnValue(true);

        global.console.log = logMock;
        global.console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createTableMock ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '7 x 1 = 7',
            filePath: options.filePath,
            fileName: options.fileName,
        });
        expect( logMock ).toHaveBeenCalledWith('\nFile was created!');
        expect( logErrorMock ).not.toHaveBeenCalled();
    });

});
