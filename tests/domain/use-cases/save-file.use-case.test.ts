import fs from "fs";
import {SaveFile} from "../../../src/domain";
import {mkdirSync} from "node:fs";

describe('SaveFileUseCase', () => {

    afterAll(() => {
        fs.rmSync('outputs', { recursive: true });
        fs.rmSync('custom-outputs', { recursive: true });
    });

    test('Should have file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('Should have file with custom values', () => {

        const saveFile = new SaveFile();
        const options = {
            fileContent: 'custom content',
            filePath: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        };
        const path = `${options.filePath}/${options.fileName}.txt`;

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(path);
        const fileContent = fs.readFileSync(path, { encoding: "utf-8" });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('Should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('Error message for directory creation testing'); }
        );

        const options = {
            fileContent: 'test error directory'
        }
        const result = saveFile.execute(options);

        expect( result ).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('Error message for file creation testing'); }
        );

        const options = {
            fileContent: 'test error file'
        }
        const result = saveFile.execute(options);

        expect( result ).toBeFalsy();

        writeFileSpy.mockRestore();
    });

})
