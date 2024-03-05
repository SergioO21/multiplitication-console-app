import fs from 'fs';

export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
    fileContent : string;
    fileName?   : string;
    filePath?   : string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {};


    execute({
        fileContent,
        fileName = 'table',
        filePath = 'outputs'
    }: SaveFileOptions): boolean {

        try {
            fs.mkdirSync(filePath, { recursive: true });
            fs.writeFileSync(`${filePath}/${fileName}.txt`,fileContent,'utf-8');
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
