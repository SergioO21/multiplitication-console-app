import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs( hideBin(process.argv) )
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'table',
        describe: 'File name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'File destination'
    })
    .check( (args) => {
        if ( args.b < 0 ) throw 'Error: base must be a positive number';
        return true;
    })
    .parseSync();
