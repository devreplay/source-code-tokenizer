interface IGrammarPath {
    [key: string]: string[];
}

export const grammarPaths: IGrammarPath = {
    'source.c': ['.c'],
    'source.cpp': ['.cpp'],
    'source.csharp': ['.cs'],
    'source.go': ['.go'],
    'source.html': ['.html'],
    'source.java': ['.java'],
    'source.js': ['.js'],
    'source.json': ['.json'],
    'source.perl': ['.perl'],
    'source.perl.6': ['.perl6'],
    'source.php': ['.php'],
    'source.python': ['.py'],
    'source.r': ['.r'],
    'source.ruby': ['.ruby'],
    'source.rust': ['.rs'],
    'source.swift': ['.swift'],
    'source.ts': ['.ts']
};

export function getFileSource(path: string) {
    for (const grammarPath in grammarPaths) {
        for (const extension of grammarPaths[grammarPath]) {
            if (path.endsWith(extension)){
                return grammarPath;
            }
        }
    }
    return undefined;
}