export interface CreateTableOptions {
    base   : number;
    limit? : number;
}

export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase{
    constructor() {}

    execute({ base, limit = 10 }: CreateTableOptions): string {

        let bodyMessage = '';
        const headerMessage: string = 
`=======================================
        Table of ${base}
=======================================\n
`;

        for( let i = 1; i <= limit; i++ ) {
            bodyMessage += `${base} x ${i} = ${base * i}`;

            if ( i !== limit ) bodyMessage += '\n';
        };

        return headerMessage + bodyMessage;
    }
}
