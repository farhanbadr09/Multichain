"use strict";
exports.__esModule = true;
var solanaWeb3 = require("@solana/web3.js");
var provider = function (rpcUrl) {
    return new solanaWeb3.Connection(rpcUrl);
};
exports["default"] = provider;
