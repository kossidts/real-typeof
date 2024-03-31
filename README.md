# Real Typeof

[![License][license-image]][license-url] [![NPM Package Version][npm-image-version]][npm-url] ![GitHub top language][language-image] ![Size][size-image] ![Last Commit][commit-image]

Retrieve the real type of a variable, a more accurate version of the `typeof` operator.

**This module has been improved for performance and it is getting better overtime.**

## Installation

```bash
$ npm i @kdts/real-typeof
```

## Usage

##### Require CommonJS (default)

```js
const real_typeof = require("@kdts/real-typeof");
```

##### Import ES-Module (default)

```js
import real_typeof from "@kdts/real-typeof";
```

##### Import ES-Module (named)

```js
import { real_typeof } from "@kdts/real-typeof";
```

> ℹ️ **When using typescript make sure to set the compiler option `moduleResolution` to `Node16` or `NodeNext`.**

#### Use in Code ([more examples below](#some-examples))

```js
let type = real_typeof(some_varibale);

if (type == "date") {
    // ...
} else if (type == "array") {
    // ...
}

real_typeof("") === "string";
real_typeof() === "undefined";
real_typeof(42) === "number";
real_typeof({}) === "object";
real_typeof([]) === "array";
real_typeof(/\d/) === "regexp";
real_typeof(null) === "null";
real_typeof(new Date()) === "date";
real_typeof(new Set()) === "set";
real_typeof(new WeakSet()) === "weakset";
real_typeof(new WeakMap()) === "weakmap";
real_typeof(BigInt("9007199254740991")) === "number";
real_typeof(() => {}) === "function";
real_typeof(async () => {}) === "function";
real_typeof(function* () {}) === "function";
```

Pass in `true` as a second parameter to get even more accurate results

```js
real_typeof(BigInt("9007199254740991"), true) === "bigint";
real_typeof(() => {}, true) === "function";
real_typeof(async () => {}, true) === "asyncfunction";
real_typeof(function* () {}, true) === "generatorfunction";
// ... everything else remains the same
```

## Benchmark

It will take a while to finish but it generate outputs on progress. As any benchmark the results are never accurate and every iteration will return different results. But if you are curious then run:

```bash
npm run benchmark
```

## License

See [LICENSE][license-url].

## Copyright

Copyright &copy; 2022. Kossi D. T. Saka.

[npm-image-version]: https://img.shields.io/npm/v/@kdts/real-typeof.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/@kdts/real-typeof.svg?color=purple
[npm-url]: https://npmjs.org/package/@kdts/real-typeof
[license-image]: https://img.shields.io/github/license/kossidts/real-typeof
[license-url]: https://github.com/kossidts/real-typeof/blob/master/LICENSE
[language-image]: https://img.shields.io/github/languages/top/kossidts/real-typeof?color=yellow
[size-image]: https://img.shields.io/github/repo-size/kossidts/real-typeof?color=light
[commit-image]: https://img.shields.io/github/last-commit/kossidts/real-typeof
[actions-url]: https://github.com/kossidts/real-typeof/actions
[workflow-image]: https://github.com/kossidts/real-typeof/actions/workflows/node.js.yml/badge.svg
[workflow-image-2]: https://github.com/kossidts/real-typeof/workflows/Node.js%20CI/badge.svg
