const realTypeOf = require("../../index.js");

module.exports = function (val) {
    return realTypeOf(val, true);
};
