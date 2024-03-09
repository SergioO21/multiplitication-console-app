import { CreateTable } from '../../../src/domain';

describe('CreateTableUseCase', () => {

    test('Should create table with deafult values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 7 });
        const rows = table.split('\n').length - 4; // 4 header lines

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain('7 x 1 = 7');
        expect( table ).toContain('7 x 10 = 70');
        expect( rows ).toBe( 10 );
    });

    test('Should create table with custom values', () => {
        const options = {
            base: 4,
            limit: 27,
        };

        const table = new CreateTable().execute(options);
        const rows = table.split('\n').length - 4; // 4 header lines

        expect( rows ).toBe( options.limit );
        expect( table ).toContain('4 x 1 = 4');
        expect( table ).toContain('4 x 27 = 108');
    });
});
