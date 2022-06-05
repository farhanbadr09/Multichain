"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("../utils/ethers");
var path = require("path");
var fs = require('fs');
var erc20Abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../abis/erc20.json")));
var ethers_2 = require("ethers");
var utils_1 = require("../utils");
var getContract = function (_a) {
    var tokenAddress = _a.tokenAddress, rpcUrl = _a.rpcUrl, privateKey = _a.privateKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var providerInstance, gasPrice, gas, nonce, contract, signer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    providerInstance = ethers_1.default(rpcUrl);
                    return [4 /*yield*/, providerInstance.getGasPrice()];
                case 1:
                    gasPrice = _b.sent();
                    gas = ethers_2.ethers.BigNumber.from(21000);
                    if (privateKey && tokenAddress) {
                        signer = new ethers_2.ethers.Wallet(privateKey, providerInstance);
                        nonce = providerInstance.getTransactionCount(signer.getAddress());
                        contract = new ethers_2.ethers.Contract(tokenAddress, erc20Abi, signer);
                    }
                    else if (privateKey && !tokenAddress) {
                        signer = new ethers_2.ethers.Wallet(privateKey, providerInstance);
                        nonce = providerInstance.getTransactionCount(signer.getAddress());
                    }
                    else if (tokenAddress && !privateKey) {
                        contract = new ethers_2.ethers.Contract(tokenAddress, erc20Abi, providerInstance);
                    }
                    return [2 /*return*/, {
                            contract: contract,
                            signer: signer,
                            gasPrice: gasPrice,
                            gas: gas,
                            nonce: nonce,
                            providerInstance: providerInstance,
                        }];
            }
        });
    });
};
var getBalance = function (_a) {
    var rpcUrl = _a.rpcUrl, tokenAddress = _a.tokenAddress, address = _a.address;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, contract, providerInstance, balance, decimals, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getContract({
                        rpcUrl: rpcUrl,
                        tokenAddress: tokenAddress,
                    })];
                case 1:
                    _b = _c.sent(), contract = _b.contract, providerInstance = _b.providerInstance;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, , 8]);
                    balance = void 0;
                    if (!contract) return [3 /*break*/, 5];
                    return [4 /*yield*/, contract.decimals()];
                case 3:
                    decimals = _c.sent();
                    return [4 /*yield*/, contract.balanceOf(address)];
                case 4:
                    balance = _c.sent();
                    return [2 /*return*/, utils_1.successResponse({
                            balance: parseFloat(ethers_2.ethers.utils.formatUnits(balance, decimals)),
                        })];
                case 5: return [4 /*yield*/, providerInstance.getBalance(address)];
                case 6:
                    balance = _c.sent();
                    return [2 /*return*/, utils_1.successResponse({
                            balance: parseFloat(ethers_2.ethers.utils.formatEther(balance)),
                        })];
                case 7:
                    error_1 = _c.sent();
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
};
var createWallet = function (derivationPath) { return __awaiter(void 0, void 0, void 0, function () {
    var path, wallet;
    return __generator(this, function (_a) {
        path = derivationPath || "m/44'/60'/0'/0/0";
        wallet = ethers_2.ethers.Wallet.createRandom({
            path: path,
        });
        return [2 /*return*/, utils_1.successResponse({
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
            })];
    });
}); };
var getAddressFromPrivateKey = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet;
    return __generator(this, function (_a) {
        wallet = new ethers_2.ethers.Wallet(args.privateKey);
        return [2 /*return*/, utils_1.successResponse({
                address: wallet.address,
            })];
    });
}); };
var generateWalletFromMnemonic = function (mnemonic, derivationPath) { return __awaiter(void 0, void 0, void 0, function () {
    var path, wallet;
    return __generator(this, function (_a) {
        path = derivationPath || "m/44'/60'/0'/0/0";
        wallet = ethers_2.ethers.Wallet.fromMnemonic(mnemonic, path);
        return [2 /*return*/, utils_1.successResponse({
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
            })];
    });
}); };
var transfer = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var _b, contract, providerInstance, gasPrice, gas, nonce, wallet, tx, decimals, error_2;
    var privateKey = _a.privateKey, tokenAddress = _a.tokenAddress, rpcUrl = _a.rpcUrl, args = __rest(_a, ["privateKey", "tokenAddress", "rpcUrl"]);
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getContract({ rpcUrl: rpcUrl, privateKey: privateKey, tokenAddress: tokenAddress })];
            case 1:
                _b = _c.sent(), contract = _b.contract, providerInstance = _b.providerInstance, gasPrice = _b.gasPrice, gas = _b.gas, nonce = _b.nonce;
                wallet = new ethers_2.ethers.Wallet(privateKey, providerInstance);
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, , 9]);
                tx = void 0;
                if (!contract) return [3 /*break*/, 5];
                return [4 /*yield*/, contract.decimals()];
            case 3:
                decimals = _c.sent();
                return [4 /*yield*/, contract.transfer(args.recipientAddress, ethers_2.ethers.utils.parseUnits(args.amount.toString(), decimals), {
                        gasPrice: args.gasPrice
                            ? ethers_2.ethers.utils.parseUnits(args.gasPrice.toString(), 'gwei')
                            : gasPrice,
                        nonce: args.nonce || nonce,
                    })];
            case 4:
                tx = _c.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, wallet.sendTransaction({
                    to: args.recipientAddress,
                    value: ethers_2.ethers.utils.parseEther(args.amount.toString()),
                    gasPrice: args.gasPrice
                        ? ethers_2.ethers.utils.parseUnits(args.gasPrice.toString(), 'gwei')
                        : gasPrice,
                    gasLimit: gas,
                    nonce: args.nonce || nonce,
                })];
            case 6:
                tx = _c.sent();
                _c.label = 7;
            case 7: return [2 /*return*/, utils_1.successResponse({
                    hash: tx.hash,
                })];
            case 8:
                error_2 = _c.sent();
                throw error_2;
            case 9: return [2 /*return*/];
        }
    });
}); };
var getTransaction = function (_a) {
    var hash = _a.hash, rpcUrl = _a.rpcUrl;
    return __awaiter(void 0, void 0, void 0, function () {
        var providerInstance, tx, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getContract({ rpcUrl: rpcUrl })];
                case 1:
                    providerInstance = (_b.sent()).providerInstance;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, providerInstance.getTransaction(hash)];
                case 3:
                    tx = _b.sent();
                    return [2 /*return*/, utils_1.successResponse({
                            receipt: tx,
                        })];
                case 4:
                    error_3 = _b.sent();
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var getEncryptedJsonFromPrivateKey = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wallet = new ethers_2.ethers.Wallet(args.privateKey);
                return [4 /*yield*/, wallet.encrypt(args.password)];
            case 1:
                json = _a.sent();
                return [2 /*return*/, utils_1.successResponse({ json: json })];
        }
    });
}); };
var getWalletFromEncryptedJson = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ethers_2.ethers.Wallet.fromEncryptedJson(args.json, args.password)];
            case 1:
                wallet = _a.sent();
                return [2 /*return*/, utils_1.successResponse({
                        privateKey: wallet.privateKey,
                        address: wallet.address,
                    })];
        }
    });
}); };
var getTokenInfo = function (_a) {
    var address = _a.address, rpcUrl = _a.rpcUrl;
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _b, name_1, symbol, decimals, totalSupply, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getContract({ tokenAddress: address, rpcUrl: rpcUrl })];
                case 1:
                    contract = (_c.sent()).contract;
                    if (!contract) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all([
                            contract.name(),
                            contract.symbol(),
                            contract.decimals(),
                            contract.totalSupply(),
                        ])];
                case 2:
                    _b = _c.sent(), name_1 = _b[0], symbol = _b[1], decimals = _b[2], totalSupply = _b[3];
                    data = {
                        name: name_1,
                        symbol: symbol,
                        decimals: decimals,
                        address: contract.address,
                        totalSupply: parseInt(ethers_2.ethers.utils.formatUnits(totalSupply, decimals)),
                    };
                    return [2 /*return*/, utils_1.successResponse(__assign({}, data))];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = {
    getBalance: getBalance,
    createWallet: createWallet,
    getAddressFromPrivateKey: getAddressFromPrivateKey,
    generateWalletFromMnemonic: generateWalletFromMnemonic,
    transfer: transfer,
    getTransaction: getTransaction,
    getEncryptedJsonFromPrivateKey: getEncryptedJsonFromPrivateKey,
    getWalletFromEncryptedJson: getWalletFromEncryptedJson,
    getTokenInfo: getTokenInfo,
};
//# sourceMappingURL=ethersHelper.js.map