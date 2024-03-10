import { CreateTable, SaveFile } from "../domain";

export interface runOptions {
    base      : number;
    fileName  : string;
    filePath  : string;
    limit     : number;
    showTable : boolean;
}

export class ServerApp {

    static run({ base, limit, showTable, fileName, filePath }: runOptions ) {
        console.log('Server running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            filePath,
            fileName
        });

        if ( showTable ) console.log( table );

        wasCreated
            ? console.log('\nFile was created!')
            : console.error('\nFile was not created!');
    }

}
