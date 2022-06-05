"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
exports.__esModule = true;
exports.executeSwap = exports.getRoutes = exports.getPossiblePairsTokenInfo = exports.getTokenInfo = exports.getWalletFromEncryptedJson = exports.getEncryptedJsonFromPrivateKey = exports.getTransaction = exports.transfer = exports.createWallet = exports.getHistorySolana = exports.recoverWalletSolana = exports.generateWalletFromMnemonic = exports.getAddressFromPrivateKey = exports.getBalance = void 0;
var ethersHelper_1 = require("../../common/helpers/ethersHelper");
var solanaHelper_1 = require("../../common/helpers/solanaHelper");
function getBalance(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getBalance(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].getBalance(__assign({}, args))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_1 = _a.sent();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getBalance = getBalance;
function getAddressFromPrivateKey(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getAddressFromPrivateKey(args)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].getAddressFromPrivateKey(args)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_2 = _a.sent();
                    throw error_2;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getAddressFromPrivateKey = getAddressFromPrivateKey;
function generateWalletFromMnemonic(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].generateWalletFromMnemonic(args.mnemonic, args.derivationPath)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].generateWalletFromMnemonic(args.mnemonic, args.derivationPath)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_3 = _a.sent();
                    throw error_3;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.generateWalletFromMnemonic = generateWalletFromMnemonic;
function recoverWalletSolana(mnemonic) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, solanaHelper_1["default"].recoverWallet(mnemonic)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_4 = _a.sent();
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.recoverWalletSolana = recoverWalletSolana;
function getHistorySolana(address, rpcUrl, options) {
    if (options === void 0) { options = { limit: 20 }; }
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, solanaHelper_1["default"].getHistory(address, rpcUrl, options)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_5 = _a.sent();
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getHistorySolana = getHistorySolana;
function createWallet(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].createWallet(args.derivationPath)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].createWallet(args.derivationPath)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_6 = _a.sent();
                    throw error_6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createWallet = createWallet;
function transfer(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].transfer(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].transfer(__assign({}, args))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_7 = _a.sent();
                    throw error_7;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.transfer = transfer;
function getTransaction(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getTransaction(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(args.network === 'solana')) return [3 /*break*/, 4];
                    return [4 /*yield*/, solanaHelper_1["default"].getTransaction(__assign({}, args))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/];
                case 5:
                    error_8 = _a.sent();
                    throw error_8;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getTransaction = getTransaction;
function getEncryptedJsonFromPrivateKey(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getEncryptedJsonFromPrivateKey(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
                case 3:
                    error_9 = _a.sent();
                    throw error_9;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getEncryptedJsonFromPrivateKey = getEncryptedJsonFromPrivateKey;
function getWalletFromEncryptedJson(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getWalletFromEncryptedJson(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
                case 3:
                    error_10 = _a.sent();
                    throw error_10;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getWalletFromEncryptedJson = getWalletFromEncryptedJson;
function getTokenInfo(args) {
    return __awaiter(this, void 0, void 0, function () {
        var error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(args.network === 'ethereum')) return [3 /*break*/, 2];
                    return [4 /*yield*/, ethersHelper_1["default"].getTokenInfo(__assign({}, args))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (args.network === 'solana') {
                        return [2 /*return*/, solanaHelper_1["default"].getTokenInfo(__assign({}, args))];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
                case 4:
                    error_11 = _a.sent();
                    throw error_11;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTokenInfo = getTokenInfo;
function getPossiblePairsTokenInfo(args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, solanaHelper_1["default"].getPossiblePairsTokenInfo(__assign({}, args))];
            }
            catch (error) {
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
exports.getPossiblePairsTokenInfo = getPossiblePairsTokenInfo;
function getRoutes(args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, solanaHelper_1["default"].getRoutes(__assign({}, args))];
            }
            catch (error) {
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
exports.getRoutes = getRoutes;
function executeSwap(args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, solanaHelper_1["default"].executeSwap(__assign({}, args))];
            }
            catch (error) {
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
exports.executeSwap = executeSwap;
