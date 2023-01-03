const fs = require("fs");
const path = require("path");

const benchmark = require("benchmark");

const libPath = path.resolve(__dirname, "libs");
const libs = fs
    .readdirSync(libPath)
    .filter(file => file.endsWith(".js"))
    .map(file => ({ name: file.replace(".js", ""), func: require(`${libPath}/${file}`) }));

let testValues = [
    new Array(),
    new Date(),
    new Error(),
    Promise.resolve(),
    [],
    new String(),
    new Promise((res, rej) => res()),
    new WeakMap(),
    new Set(),
    new WeakSet(),
    undefined,
    null,
    "",
    42,
    NaN,
    new Map(),
    () => {},
    async () => {},
    function* () {},
    BigInt("9007199254740991"),
    {},
    /\d/,
    arguments,
    Buffer.from("test ultra lang war uint8array"),
    new RegExp("\\d", "i"),
    new Int8Array(),
    new Uint8Array(),
    new Uint8ClampedArray(),
    new Int16Array(),
    new Uint16Array(),
    new Int32Array(),
    new Uint32Array(),
    new Float32Array(),
    new Float64Array(),
    new BigInt64Array(),
    new BigUint64Array(),
];

console.log(`${"Package".padEnd(20)}\t ${"Result".padEnd(25)}\t Performance`);
console.log(`${"".padEnd(20, "-")}\t ${"".padEnd(25, "-")}\t ${"".padEnd(25, "-")}`);

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
