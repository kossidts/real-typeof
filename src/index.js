const toString = Object.prototype.toString;

// * @typedef {Function} RealTypeof - Returns the type of the given argument as a string.

/**
 * Returns the type of the given argument as a string.
 * @param {*} arg - Any type variable
 * @param {boolean} [deep=false] - Whether or not to distinguish between function types
 * @returns {string}
 */
function real_typeof(arg, deep) {
    if (arg === null) return "null";

    if (arg === undefined) return "undefined";

    let type = /** @type {string} */ (typeof arg);
    if (type === "boolean") return "boolean";

    if (type === "number") return "number";

    if (type === "string") return "string";

    // Symbol (new in ECMAScript 2015)
    if (type === "symbol") return "symbol";

    // BigInt (new in ECMAScript 2020)
    if (type === "bigint") return deep !== true ? "number" : "bigint";

    if (type === "function") {
        if (deep !== true) return "function";

        return arg.constructor.name.toLowerCase();
    }

    if (Array.isArray(arg)) return "array";

    if (arg instanceof String) return "string";
    if (arg instanceof Promise) return "promise";
    if (arg instanceof Number) return "number";
    if (arg instanceof Date) return "date";
    if (arg instanceof Error) return "error";
    if (arg instanceof RegExp) return "regexp";
    if (arg instanceof Map) return "map";
    if (arg instanceof WeakMap) return "weakmap";
    // if (arg instanceof WeakMap) return deep !== true ? "map" : "weakmap";
    if (arg instanceof Set) return "set";
    if (arg instanceof WeakSet) return "weakset";
    // if (arg instanceof WeakSet) return deep !== true ? "set" : "weakset";

    // if (arg instanceof Buffer) return "buffer";
    // if (arg.constructor && arg.constructor.name === "Buffer") return "buffer";
    if (arg.constructor && typeof arg.constructor.isBuffer === "function" && arg.constructor.isBuffer(arg)) return "buffer";

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
    if (arg instanceof Int8Array) return "int8array";
    if (arg instanceof Uint8Array) return "uint8array";
    if (arg instanceof Uint8ClampedArray) return "uint8clampedarray";
    if (arg instanceof Int16Array) return "int16array";
    if (arg instanceof Uint16Array) return "uint16array";
    if (arg instanceof Int32Array) return "int32array";
    if (arg instanceof Uint32Array) return "uint32array";
    if (arg instanceof Float32Array) return "float32array";
    if (arg instanceof Float64Array) return "float64array";
    if (arg instanceof BigInt64Array) return "bigint64array";
    if (arg instanceof BigUint64Array) return "biguint64array";

    type = toString.call(arg);

    if (type === "[object Object]") return "object";
    if (type === "[object RegExp]") return "regexp";
    if (type === "[object Arguments]") return "arguments";

    type = type.slice(8, -1).toLowerCase();

    if (deep !== true && type.indexOf("function") != -1) return "function";

    if (type.indexOf(" ") != -1) {
        return type.replace(/\s/g, "");
    }

    return type;
}

module.exports = real_typeof;
// module.exports.default = real_typeof;
