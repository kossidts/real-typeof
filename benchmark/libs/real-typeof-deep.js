const realTypeOf = require("../../src/index.js");

module.exports = function (val) {
    return realTypeOf(val, true);
};
