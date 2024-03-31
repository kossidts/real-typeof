// export { default, default as real_typeof } from "./index.js";
import real_typeof from "./index.js";

// /**
//  * @typedef {Function} RealTypeof - Returns the type of the given argument as a string.
//  * @param {*} arg - Any type variable
//  * @param {boolean} [deep=false] - Whether or not to distinguish between function types
//  * @returns {string}
//  */

// export default real_typeof /** @type {RealTypeof} */;
// export { real_typeof /** @type {RealTypeof} */ };

// /** @type {RealTypeof} */
// const defaultExport = real_typeof;

// /** @type {RealTypeof} */
// const namedExport = real_typeof;

/**
 * Returns the type of the given argument as a string.
 * @param {*} arg - Any type variable
 * @param {boolean} [deep=false] - Whether or not to distinguish between function types
 * @returns {string}
 */
const defaultExport = real_typeof;

/**
 * Returns the type of the given argument as a string.
 * @param {*} arg - Any type variable
 * @param {boolean} [deep=false] - Whether or not to distinguish between function types
 * @returns {string}
 */
const namedExport = real_typeof;

export default defaultExport;
export { namedExport as real_typeof };
