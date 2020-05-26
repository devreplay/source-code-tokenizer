import * as fs from "fs";
import * as vsctm from "vscode-textmate";
import { OnigScanner, OnigString, loadWASM } from 'onigasm';
import { grammarPaths } from "./languages";
const path = require('path');

export interface IToken {
    scopes: string[];
    value: string;
    line: number;
    columns: {start: number, end: number};
}

function getOniguruma(): Promise<vsctm.IOnigLib> {
    const wasmBin = fs.readFileSync(path.join(__dirname, '../node_modules/onigasm/lib/onigasm.wasm')).buffer;
    const onigasmLib = (<Promise<any>>loadWASM(wasmBin)).then((_: any) => {
        return {
            createOnigScanner(patterns: string[]) { return new OnigScanner(patterns); },
            createOnigString(s: string) { return new OnigString(s); }
        };
    });
	return onigasmLib;
}

const registry = new vsctm.Registry({
    onigLib: getOniguruma(),
    loadGrammar: async(scopeName: string) => {

        const location = path.join(__dirname, 'syntaxes', grammarPaths[scopeName]);
        if (!location) { return null; }
        try {
            const content = fs.readFileSync(location).toString();
            return vsctm.parseRawGrammar(content, location);
        } catch (e) {
            console.log(e);
            return null;
        }
    },
});

export async function tokenize(text: string, source: string, beforeRuleStack?: vsctm.StackElement) {
    const tokens: IToken[] = [];
    let ruleStack = vsctm.INITIAL;
    if (beforeRuleStack) {
        ruleStack = beforeRuleStack;
    }
    const grammar = await registry.loadGrammar(source);

    if (grammar === null) {
        return undefined;
    }
    const splitedText = text.split("\n");
    let lineNum = 1;
    for (const line of splitedText){
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        ruleStack = lineTokens.ruleStack;
        for (const token of lineTokens.tokens) {
            tokens.push({
                scopes: token.scopes,
                value: line.substring(token.startIndex, token.endIndex),
                line: lineNum,
                columns: {start: token.startIndex+1, end: token.endIndex+1}
            });
        }
        lineNum++;
    }
    return {
        ruleStack,
        tokens,
    };
}

import { getFileSource } from './extensionmap';
export { getFileSource }
