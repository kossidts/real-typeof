# Real type of

Retrieve the real type of a variable. A more accurate version of the `typeof` operator.

```js
real_type_of("") === "string";
real_type_of() === "undefined";
real_type_of(42) === "number";
real_type_of({}) === "object";
real_type_of([]) === "array";
real_type_of(null) === "null";
real_type_of(new Date()) === "date";
real_type_of(new Set()) === "set";
real_type_of(new WeakSet()) === "weakset";
real_type_of(new WeakMap()) === "weakmap";
real_type_of(() => {}) === "function";
real_type_of(async () => {}) === "function";
real_type_of(function* () {}) === "function";
```

Pass in `true` as a second parameter to get even more accurate results

```js
real_type_of(() => {}, true) === "function";
real_type_of(async () => {}, true) === "asyncfunction";
real_type_of(function* () {}, true) === "generatorfunction";
// ... everything else remains the same
```

## Install

```bash
$ npm install @christophe.kdts/real_type_of
```

## Usage

```js
const real_type_of = require("@christophe.kdts/real_type_of");

let type = real_type_of(some_varibale);

if (type == "date") {
    // ...
} else if (type == "array") {
    // ...
}
```
