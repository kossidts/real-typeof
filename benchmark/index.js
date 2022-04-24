const fs = require("fs");
const path = require("path");

const benchmark = require("benchmark");

const libPath = path.resolve(__dirname, "libs");
const libs = fs
    .readdirSync(libPath)
    .filter(file => file.endsWith(".js"))
    .map(file => ({ name: file.replace(".js", ""), func: require(`${libPath}/${file}`) }));

let testValues = [
    // undefined, // realTypeOf, kindOf +/-
    // null, // realTypeOf, kindOf +/-
    // "", // realTypeOf, kindOf +/-
    // new String(), // realTypeOf by far
    // 42, // realTypeOf, kindOf +/-
    // NaN, // realTypeOf, kindOf +/-
    // [], // realTypeOf by far
    // new Array(), // realTypeOf by far
    // new Date(), // realTypeOf by far
    // new Error(), // realTypeOf by far
    // Promise.resolve(), // realTypeOf by far
    // new Promise((res, rej) => res()), // realTypeOf by far
    // new Map(), // realTypeOf, typeof +/-, map expected but type-of returns 'object'
    // new WeakMap(), //realTypeOf by far,  weakmap expected but type-of returns 'object'
    // new Set(), // realTypeOf by far, set expected but type-of returns 'object'
    // new WeakSet(), // realTypeOf by far, weakset expected but type-of returns 'object'
    // () => {}, // realTypeOf, type-of +/-
    // async () => {}, // asyncfunction expected but kindOf returns 'function' and type-of returns 'object'
    // function* () {}, // generatorfunction expected but type-of returns 'object'
    //
    // {},
    // arguments,
    Buffer.from("test ultra lang war uint8array"),
    new Int8Array(),
    // new Uint8Array(),
    // new Uint8ClampedArray(),
    // new Int16Array(),
    // new Uint16Array(),
    // new Int32Array(),
    // new Uint32Array(),
    // new Float32Array(),
    // new Float64Array(),
    // new BigInt64Array(),
    // new BigUint64Array(),
];

for (const testEntity of testValues) {
    const suite = new benchmark.Suite();

    // Add tests
    for (const { name, func } of libs) {
        suite.add(`${name}`, () => {
            func(testEntity);
        });
    }

    suite
        .on("cycle", function (event) {
            let { func } = libs.find(obj => obj.name === event.target.name);
            let result = func(testEntity);
            let name = `${event.target.name}:`;
            let info = String(event.target).replace(event.target.name, `${name.padEnd(20)}\t ${result.padEnd(25)}\t`);
            console.log(info);
        })
        .on("complete", function () {
            console.log("--------> Fastest is " + this.filter("fastest").map("name") + "\n");
        })
        .run({
            // async: true
        });
}

// https://github.com/behnammodi/polyfill/blob/master/string.polyfill.js
if (!String.prototype.padEnd) {
    Object.defineProperty(String.prototype, "padEnd", {
        configurable: true,
        writable: true,
        value: function (targetLength, padString) {
            targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
            padString = String(typeof padString !== "undefined" ? padString : " ");
            if (this.length > targetLength) {
                return String(this);
            } else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
                }
                return String(this) + padString.slice(0, targetLength);
            }
        },
    });
}
