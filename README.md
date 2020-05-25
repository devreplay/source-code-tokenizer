# Source code tokenizer powerd by vscode


## Usage

1. Install

```sh
npm install -g source-code-tokenizer
```

2. Make sample source code

```js
console.log("Hello World");
```

3. Execute Tokenizer

```sh
tokenizer target.js
```

```
1:1:8: console
[ 'source.js', 'meta.function-call.js', 'support.class.console.js' ]
1:8:9: .
[ 'source.js', 'meta.function-call.js', 'punctuation.accessor.js' ]
1:9:12: log
[ 'source.js', 'meta.function-call.js', 'support.function.console.js' ]
1:12:13: (
[ 'source.js', 'meta.brace.round.js' ]
1:13:14: "
[
  'source.js',
  'string.quoted.double.js',
  'punctuation.definition.string.begin.js'
]
1:14:25: Hello World
[ 'source.js', 'string.quoted.double.js' ]
1:25:26: "
[
  'source.js',
  'string.quoted.double.js',
  'punctuation.definition.string.end.js'
]
1:26:27: )
[ 'source.js', 'meta.brace.round.js' ]
1:27:28: ;
[ 'source.js', 'punctuation.terminator.statement.js' ]
```

### On the JavaScript

**Parparing...**

## Supported languages

* C/C++
* C#
* Go
* HTML
* Java
* JavaScript
* Json
* Perl/Perl6
* PHP
* Python
* R
* Ruby
* Rust
* Swift
* TypeScript
