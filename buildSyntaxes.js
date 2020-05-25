
const fs = require('fs');
const https = require('https');
const path = require('path');

const rawdata = fs.readFileSync('syntaxes.json');
const syntaxes = JSON.parse(rawdata);
const languages = [
"interface IGrammarPath {",
"    [key: string]: string;",
"}",
"",
"export const grammarPaths: IGrammarPath = {",
];
for (syntax of syntaxes) {
    const url = 'https://raw.githubusercontent.com/Microsoft/vscode/master/extensions/' + syntax.path;
    const basefile = path.basename(syntax.path);
    const id = syntax.id;
    console.log(basefile);
    languages.push(`    \'${id}\': \'${basefile}\',`);
    download(url).then(content => {
        try {
            fs.writeFileSync(path.join('src/syntaxes', basefile), content);
        }catch(e){
            console.log(e);
        }
    });
}
languages.push("};")
fs.writeFileSync('src/languages.ts', languages.join("\n"));

function download(url) {
	return new Promise((c, e) => {
		var content = '';
		https.get(url, function (response) {
			response.on('data', function (data) {
				content += data.toString();
			}).on('end', function () {
				if (response.statusCode === 403 && response.headers['x-ratelimit-remaining'] === '0') {
					e('GitHub API rate exceeded. Set GITHUB_TOKEN environment variable to increase rate limit.');
					return;
				}
				c(content);
			});
		}).on('error', function (err) {
			e(err.message);
		});
	});
}