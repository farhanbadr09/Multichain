"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var provider = function (rpcUrl) {
    return new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
};
exports["default"] = provider;
