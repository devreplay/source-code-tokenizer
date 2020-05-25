import commander = require('commander');
import { tryReadFile } from './file';
import { tokenize } from './index';
import { getFileSource } from './extensionmap';


const cli = {
    async execute() {
        const parsed = commander.parseOptions(process.argv.slice(2));
        commander.args = parsed.operands;
        if (parsed.unknown.length !== 0) {
            (commander.parseArgs as (args: string[], unknown: string[]) => void)([], parsed.unknown);
        }
        if (
            !(
                commander.args.length > 0
            )
        ) {
            console.error('No files specified.');
            return 2;
        }
        const targetFile = commander.args[0]
        const contents = tryReadFile(targetFile);
        if (contents === undefined) {
            console.log(`We could not read file ${targetFile}`);
            return 2;
        }
        const source = getFileSource(targetFile);
        if (source === undefined) {
            console.log(`We are not this file extension ${targetFile}`);
            return 2;
        }

        const tokens = await tokenize(contents, source);
        if (tokens){
            for (const element of tokens.tokens) {
                console.log(`${element.line}:${element.columns.start}:${element.columns.end}: ${element.value}`)
                console.log(element.scopes);
            };
        }

        return 0;
    }
}

module.exports = cli;

