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
exports.chainId = exports.ACCOUNT_LAYOUT = void 0;
var solana_1 = require("../utils/solana");
var solanaWeb3 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var bs58 = require("bs58");
var utils_1 = require("../utils");
var bip39 = require("bip39");
var ed25519_hd_key_1 = require("ed25519-hd-key");
// @ts-ignore
var BufferLayout = require("buffer-layout");
var axios_1 = require("axios");
exports.ACCOUNT_LAYOUT = BufferLayout.struct([
    BufferLayout.blob(32, 'mint'),
    BufferLayout.blob(32, 'owner'),
    BufferLayout.nu64('amount'),
    BufferLayout.blob(93),
]);
exports.chainId = {
    'mainnet-beta': 101,
    testnet: 102,
    devnet: 103
};
var getConnection = function (rpcUrl) {
    var connection = (0, solana_1["default"])(rpcUrl);
    return connection;
};
var getHistory = function (address, rpcUrl, options) {
    if (options === void 0) { options = { limit: 20 }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = getConnection(rpcUrl);
                    return [4 /*yield*/, connection.getConfirmedSignaturesForAddress2(new solanaWeb3.PublicKey(address), options)];
                case 1:
                    history = _a.sent();
                    return [2 /*return*/, history];
            }
        });
    });
};
var getBalance = function (args) {
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, balance, account, publicKey, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = getConnection(args.rpcUrl);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    balance = void 0;
                    if (!args.tokenAddress) return [3 /*break*/, 3];
                    return [4 /*yield*/, connection.getTokenAccountsByOwner(new solanaWeb3.PublicKey(args.address), {
                        mint: new solanaWeb3.PublicKey(args.tokenAddress)
                    })];
                case 2:
                    account = _a.sent();
                    balance =
                        account.value.length > 0
                            ? exports.ACCOUNT_LAYOUT.decode(account.value[0].account.data).amount
                            : 0;
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        balance: balance
                    })];
                case 3:
                    publicKey = new solanaWeb3.PublicKey(args.address);
                    return [4 /*yield*/, connection.getBalance(publicKey)];
                case 4:
                    balance = _a.sent();
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        balance: balance
                    })];
                case 5:
                    error_1 = _a.sent();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
};
var createWallet = function (derivationPath) {
    return __awaiter(void 0, void 0, void 0, function () {
        var path, mnemonic, seed, derivedSeed, keyPair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = derivationPath || "m/44'/501'/0'/0'";
                    mnemonic = bip39.generateMnemonic();
                    return [4 /*yield*/, bip39.mnemonicToSeed(mnemonic)];
                case 1:
                    seed = _a.sent();
                    derivedSeed = (0, ed25519_hd_key_1.derivePath)(path, seed).key;
                    keyPair = solanaWeb3.Keypair.fromSeed(derivedSeed);
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        address: keyPair.publicKey.toBase58(),
                        privateKey: bs58.encode(keyPair.secretKey),
                        mnemonic: mnemonic
                    })];
            }
        });
    });
};
var generateWalletFromMnemonic = function (mnemonic, derivationPath) {
    return __awaiter(void 0, void 0, void 0, function () {
        var path, seed, derivedSeed, keyPair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = derivationPath || "m/44'/501'/0'/0'";
                    return [4 /*yield*/, bip39.mnemonicToSeed(mnemonic)];
                case 1:
                    seed = _a.sent();
                    derivedSeed = (0, ed25519_hd_key_1.derivePath)(path, seed).key;
                    keyPair = solanaWeb3.Keypair.fromSeed(derivedSeed);
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        address: keyPair.publicKey.toBase58(),
                        privateKey: bs58.encode(keyPair.secretKey),
                        mnemonic: mnemonic
                    })];
            }
        });
    });
};
var recoverWallet = function (mnemonic) {
    return __awaiter(void 0, void 0, void 0, function () {
        var path, seed, derivedSeed, keyPair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = "m/44'/501'/0'/0'";
                    return [4 /*yield*/, bip39.mnemonicToSeed(mnemonic)];
                case 1:
                    seed = _a.sent();
                    derivedSeed = (0, ed25519_hd_key_1.derivePath)(path, seed).key;
                    keyPair = solanaWeb3.Keypair.fromSeed(derivedSeed);
                    //const derivedSeed = derivePath(path, (seed as unknown) as string).key;
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        address: keyPair.publicKey.toBase58(),
                        privateKey: bs58.encode(keyPair.secretKey)
                    })];
            }
        });
    });
};
var transfer = function (args) {
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, recipient, secretKey, from, mint, fromTokenAccount, recipientTokenAccount, signature_1, transaction, signature, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = getConnection(args.rpcUrl);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    recipient = new solanaWeb3.PublicKey(args.recipientAddress);
                    secretKey = void 0;
                    if (args.privateKey.split(',').length > 1) {
                        secretKey = new Uint8Array(args.privateKey.split(','));
                    }
                    else {
                        secretKey = bs58.decode(args.privateKey);
                    }
                    from = solanaWeb3.Keypair.fromSecretKey(secretKey, {
                        skipValidation: true
                    });
                    if (!args.tokenAddress) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, spl_token_1.getMint)(connection, new solanaWeb3.PublicKey(args.tokenAddress))];
                case 2:
                    mint = _a.sent();
                    return [4 /*yield*/, (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, from, mint.address, from.publicKey)];
                case 3:
                    fromTokenAccount = _a.sent();
                    return [4 /*yield*/, (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, from, mint.address, recipient)];
                case 4:
                    recipientTokenAccount = _a.sent();
                    return [4 /*yield*/, (0, spl_token_1.transfer)(connection, from, fromTokenAccount.address, recipientTokenAccount.address, from.publicKey, solanaWeb3.LAMPORTS_PER_SOL * args.amount)];
                case 5:
                    signature_1 = _a.sent();
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        hash: signature_1
                    })];
                case 6:
                    transaction = new solanaWeb3.Transaction().add(solanaWeb3.SystemProgram.transfer({
                        fromPubkey: from.publicKey,
                        toPubkey: recipient,
                        lamports: solanaWeb3.LAMPORTS_PER_SOL * args.amount
                    }));
                    return [4 /*yield*/, solanaWeb3.sendAndConfirmTransaction(connection, transaction, [from])];
                case 7:
                    signature = _a.sent();
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        hash: signature
                    })];
                case 8:
                    error_2 = _a.sent();
                    throw error_2;
                case 9: return [2 /*return*/];
            }
        });
    });
};
var getAddressFromPrivateKey = function (args) {
    return __awaiter(void 0, void 0, void 0, function () {
        var secretKey, keyPair;
        return __generator(this, function (_a) {
            if (args.privateKey.split(',').length > 1) {
                secretKey = new Uint8Array(args.privateKey.split(','));
            }
            else {
                secretKey = bs58.decode(args.privateKey);
            }
            keyPair = solanaWeb3.Keypair.fromSecretKey(secretKey, {
                skipValidation: true
            });
            return [2 /*return*/, (0, utils_1.successResponse)({
                address: keyPair.publicKey.toBase58()
            })];
        });
    });
};
var getTransaction = function (args) {
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, tx, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = getConnection(args.rpcUrl);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connection.getTransaction(args.hash)];
                case 2:
                    tx = _a.sent();
                    return [2 /*return*/, (0, utils_1.successResponse)({
                        receipt: tx
                    })];
                case 3:
                    error_3 = _a.sent();
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var getTokenInfo = function (args) {
    return __awaiter(void 0, void 0, void 0, function () {
        var connection, tokenList, token, data, tokenSupply, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    connection = getConnection(args.rpcUrl);
                    return [4 /*yield*/, getTokenList(args.cluster)];
                case 1:
                    tokenList = _a.sent();
                    token = tokenList.find(function (token) { return token.address === args.address; });
                    if (!token) return [3 /*break*/, 3];
                    data = {
                        name: token.name,
                        symbol: token.symbol,
                        address: token.address,
                        decimals: token.decimals,
                        logoUrl: token.logoURI,
                        totalSupply: 0
                    };
                    return [4 /*yield*/, connection.getTokenSupply(new solanaWeb3.PublicKey(data.address))];
                case 2:
                    tokenSupply = _a.sent();
                    data.totalSupply = tokenSupply.value.uiAmount;
                    return [2 /*return*/, (0, utils_1.successResponse)(__assign({}, data))];
                case 3: return [2 /*return*/];
                case 4:
                    error_4 = _a.sent();
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var getTokenList = function (cluster) {
    return __awaiter(void 0, void 0, void 0, function () {
        var tokenListUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenListUrl = 'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json';
                    return [4 /*yield*/, axios_1["default"].get(tokenListUrl)];
                case 1:
                    response = _a.sent();
                    if (response.data && response.data.tokens) {
                        return [2 /*return*/, response.data.tokens.filter(function (data) { return data.chainId === exports.chainId[cluster]; })];
                    }
                    return [2 /*return*/, []];
            }
        });
    });
};
var getPossiblePairsTokenInfo = function (_a) {
    var tokens = _a.tokens, routeMap = _a.routeMap, inputToken = _a.inputToken;
    try {
        if (!inputToken) {
            return {};
        }
        var possiblePairs = inputToken
            ? routeMap.get(inputToken.address) || []
            : []; // return an array of token mints that can be swapped with SOL
        var possiblePairsTokenInfo_1 = {};
        possiblePairs.forEach(function (address) {
            possiblePairsTokenInfo_1[address] = tokens.find(function (t) {
                return t.address == address;
            });
        });
        // Perform your conditionals here to use other outputToken
        // const alternativeOutputToken = possiblePairsTokenInfo[USDT_MINT_ADDRESS]
        return possiblePairsTokenInfo_1;
    }
    catch (error) {
        throw error;
    }
};
var getRoutes = function (_a) {
    var jupiter = _a.jupiter, inputToken = _a.inputToken, outputToken = _a.outputToken, inputAmount = _a.inputAmount, slippage = _a.slippage;
    return __awaiter(void 0, void 0, void 0, function () {
        var inputAmountInSmallestUnits, routes, _b, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    if (!inputToken || !outputToken) {
                        return [2 /*return*/, null];
                    }
                    console.log("Getting routes for ".concat(inputAmount, " ").concat(inputToken.symbol, " -> ").concat(outputToken.symbol, "..."));
                    inputAmountInSmallestUnits = inputToken
                        ? Math.round(inputAmount * Math.pow(10, inputToken.decimals))
                        : 0;
                    if (!(inputToken && outputToken)) return [3 /*break*/, 2];
                    return [4 /*yield*/, jupiter.computeRoutes({
                        inputMint: new solanaWeb3.PublicKey(inputToken.address),
                        outputMint: new solanaWeb3.PublicKey(outputToken.address),
                        inputAmount: inputAmountInSmallestUnits,
                        slippage: slippage,
                        forceFetch: true
                    })];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b = null;
                    _c.label = 3;
                case 3:
                    routes = _b;
                    if (routes && routes.routesInfos) {
                        console.log("Possible number of routes:", routes.routesInfos.length);
                        console.log("Best quote: ", routes.routesInfos[0].outAmount / Math.pow(10, outputToken.decimals), "(".concat(outputToken.symbol, ")"));
                        return [2 /*return*/, routes];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _c.sent();
                    throw error_5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var executeSwap = function (_a) {
    var jupiter = _a.jupiter, routeInfo = _a.routeInfo;
    return __awaiter(void 0, void 0, void 0, function () {
        var execute, swapResult, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, jupiter.exchange({
                        routeInfo: routeInfo
                    })];
                case 1:
                    execute = (_b.sent()).execute;
                    return [4 /*yield*/, execute()];
                case 2:
                    swapResult = _b.sent();
                    if (swapResult.error) {
                        console.log(swapResult.error);
                    }
                    else {
                        console.log("https://explorer.solana.com/tx/".concat(swapResult.txid));
                        console.log("inputAddress=".concat(swapResult.inputAddress.toString(), " outputAddress=").concat(swapResult.outputAddress.toString()));
                        console.log("inputAmount=".concat(swapResult.inputAmount, " outputAmount=").concat(swapResult.outputAmount));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    throw error_6;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports["default"] = {
    getHistory: getHistory,
    getBalance: getBalance,
    createWallet: createWallet,
    generateWalletFromMnemonic: generateWalletFromMnemonic,
    recoverWallet: recoverWallet,
    transfer: transfer,
    getAddressFromPrivateKey: getAddressFromPrivateKey,
    getTransaction: getTransaction,
    getTokenInfo: getTokenInfo,
    getPossiblePairsTokenInfo: getPossiblePairsTokenInfo,
    getRoutes: getRoutes,
    executeSwap: executeSwap
};
