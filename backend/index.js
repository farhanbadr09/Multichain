const hdWallet = require("./function/hdWallet");
const httpStatus = require("http-status");
const tokenListFunc = require("./function/tokenListFunc.js");
const actionFunc = require("./function/action.js");
const ApiError = require("./utils/ApiError");
const express = require("express");
const catchAsync = require("./utils/catchAsync");
const morgan = require("./config/morgan");
const { errorConverter, errorHandler } = require("./middlewares/error");
const multiChainWallet = require("./services/wallet/mHdWallet");
const NFTs = require('./NFTlib');
const web3 = require("@solana/web3.js");
let cors = require("cors");
const jup_ag = require("@jup-ag/core");
const fetch = require("isomorphic-fetch");
const bs58 = require("bs58");


const tokenList = new tokenListFunc();
const action = new actionFunc();
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
var phrase;
var wallet;

router.get("/", function (req, res) {
  res.send("Hello world!");
});

router.get("/hdWallet/createPhrase",catchAsync(async (req, res) => {
    phrase = hdWallet.createPhrase();
    if (phrase) {
      res
        .status(httpStatus.CREATED)
        .json({ status: true, statusCode: httpStatus.CREATED, phrase });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(
          new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "We are facing some error, Please try again"
          )
        );
    }
  })
);

router.get("/hdWallet/createWallet", (req, res) => {
  const addr = hdWallet.createWallet(req.query.phrase);
  if (addr) {
    res
      .status(httpStatus.CREATED)
      .json({ status: true, statusCode: httpStatus.CREATED, address: addr });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, "Invalid mnemonic"));
  }
});

router.get("/services/createWallet", async (req, res) => {
    const net = req.query.network;
    const derivPath = req.query.derivationPath;
    const wlt = await multiChainWallet.createWallet({
        derivationPath: derivPath, // Leave empty to use default derivation path
        network: net,
    });
    if (wlt) {
        res
            .status(httpStatus.CREATED)
            .json({ status: true, statusCode: httpStatus.CREATED, wallet: wlt });
    } else {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_ACCEPTABLE, "Not Created"));
    }
});

router.get("/services/getBalance", async(req, res) => {
    try {
        const addr = req.query.address;
        const net = req.query.network;
        const rpcURL = req.query.rpcUrl;
        const tknAdrr = req.query.tokenAddress;
        let result = await multiChainWallet.getBalance({
            address: addr,
            network: net,
            rpcUrl: rpcURL,
            tokenAddress: tknAdrr
        });
        if (result) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                result: result,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

router.get("/services/generateWalletFromMnemonic", async (req, res) => {
    const net = req.query.network;
    const derivPath = req.query.derivationPath;
    const mnmnic = req.query.mnemonic;
    const wlt = await multiChainWallet.generateWalletFromMnemonic({
        mnemonic: mnmnic,
        derivationPath: derivPath, // Leave empty to use default derivation path
        network: net,
    });
    if (wlt) {
        res
            .status(httpStatus.CREATED)
            .json({ status: true, statusCode: httpStatus.CREATED, wallet: wlt });
    } else {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_ACCEPTABLE, "Not Created"));
    }
});

router.get("/services/getAddressFromPrivateKey", async (req, res) => {
    const net = req.query.network;
    const prvtKey = req.query.privateKey;
    const addr = await multiChainWallet.getAddressFromPrivateKey({
        privateKey: prvtKey,
        network: net
    });
    if (addr) {
        res.status(httpStatus.FOUND).json({
            status: true,
            statusCode: httpStatus.FOUND,
            Address: addr,
        });
    } else {
        res
            .status(httpStatus.NOT_FOUND)
            .send(
                new ApiError(
                    httpStatus.NOT_FOUND,
                    "We are facing some error, please try again"
                )
            );
    }
});

router.get("/services/transfer", async (req, res) => {
    const net = req.query.network;
    const recpntAddr = req.query.recipientAddress;
    const amnt = req.query.amount;
    const rpc = req.query.rpcUrl;
    const prv = req.query.privateKey;
    const tokn = req.query.tokenAddress;
    const gas = req.query.gasPrice;
    const nnc = req.query.nonce;

    const payload = {
        recipientAddress: recpntAddr,
        amount: amnt,
        network: net,
        rpcUrl: rpc,
        privateKey: prv,
        tokenAddress: tokn,
        gasPrice: gas,
        nonce: nnc
    };
    try {
        let result = await multiChainWallet.transfer(payload);
        if (result) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                result: result,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

router.get("/services/getTokenInfo", async (req, res) => {
    try {
        const addr = req.query.address;
        const net = req.query.network;
        const rpcURL = req.query.rpcUrl;
        const clstr = req.query.cluster;

        const data = {
            address: addr,
            network: net,
            rpcUrl: rpcURL,
            cluster: clstr,
        };
        let result = await multiChainWallet.getTokenInfo(data);
        if (result) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                result: result,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

router.get("/services/getTransaction", async (req, res) => {
    try {
        const hsh = req.query.hash;
        const net = req.query.network;
        const rpcURL = req.query.rpcUrl;

        const data = {
            rpcUrl: rpcURL,
            hash: hsh,
            network: net
        };
        let receipt = await multiChainWallet.getTransaction(data);
        if (receipt) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                receipt: receipt,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

router.get("/services/recoverWalletSolana", async (req, res) => {
    const addr = await multiChainWallet.recoverWalletSolana(req.query.phrase);
    if (addr) {
        res
            .status(httpStatus.CREATED)
            .json({ status: true, statusCode: httpStatus.CREATED, address: addr });
    } else {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, "Invalid mnemonic"));
    }
});

router.get("/services/getHistorySolana", async (req, res) => {
    const addr = req.query.address;
    const rpcURL = req.query.rpcUrl;
    const lmt = parseInt( req.query.limit);
    const optns = { limit: lmt };
    try {
        let history = await multiChainWallet.getHistorySolana(addr, rpcURL, optns);
        if (history) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                history: history,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

// Get all mint tokens (NFTs) from your wallet
router.get("/services/getMintTokens", async (req, res) => {
    const walletAddr = req.query.address;
    const rpcURL = req.query.rpcUrl;
    try {
        const conn = new web3.Connection(rpcURL);
        //const connection = getConnection(rpcURL);
        let mints = await NFTs.getMintTokensByOwner(conn, walletAddr);
        if (mints) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                NFTs: mints,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

// Get NFT information (metadata)
router.get("/services/getNFTByMintAddress", async (req, res) => {
    const mintAddr = req.query.mintAddress;
    const rpcURL = req.query.rpcUrl;
    try {
        const conn = new web3.Connection(rpcURL);
        //const connection = getConnection(rpcURL);
        let myNFT = await NFTs.getNFTByMintAddress(conn, mintAddr);
        if (myNFT) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                NFT: myNFT,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});

// Additional function to get all NFTs from wallet address
router.get("/services/getNFTsByOwner", async (req, res) => {
    const walletAddr = req.query.address;
    const rpcURL = req.query.rpcUrl;
    try {
        const conn = new web3.Connection(rpcURL);
        //const connection = getConnection(rpcURL);
        let mints = await NFTs.getNFTsByOwner(conn, walletAddr);
        if (mints) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                NFTs: mints,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});


router.get("/services/swap", async (req, res) => {
    //const walletAddr = req.query.address;
    const rpcURL = req.query.rpcUrl;
    const clstr = req.query.cluster;
    const prv = req.query.privateKey;
    const INPUT_MINT_ADDRESS = req.query.INPUT_MINT_ADDRESS;
    const OUTPUT_MINT_ADDRESS = req.query.OUTPUT_MINT_ADDRESS;
    try {
        const connection = new web3.Connection(rpcURL);

        const tokens = await (await fetch(jup_ag.TOKEN_LIST_URL[clstr])).json();

        const platformFeeAndAccounts = {
            feeBps: 50,
            feeAccounts: await jup_ag.getPlatformFeeAccounts(
                connection,
                new web3.PublicKey("9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA") // The platform fee account owner
            ),
        };

        const USER_PRIVATE_KEY = bs58.decode(prv);
        const USER_KEYPAIR = web3.Keypair.fromSecretKey(USER_PRIVATE_KEY);

        const jupiter = await jup_ag.Jupiter.load({
            connection,
            cluster: clstr,
            user: USER_KEYPAIR, // or public key
            platformFeeAndAccounts,
        });

        const routeMap = jupiter.getRouteMap();
                // Token Mints
        /*export const INPUT_MINT_ADDRESS =
            ENV === "devnet"
                ? "So11111111111111111111111111111111111111112" // SOL
                : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
        export const OUTPUT_MINT_ADDRESS =
            ENV === "devnet"
                ? "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt" // SRM
                : "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"; // USDT
                */
        const inputToken = tokens.find((t) => t.address == INPUT_MINT_ADDRESS); // USDC Mint Info
        const outputToken = tokens.find((t) => t.address == OUTPUT_MINT_ADDRESS); // USDT Mint Info

        const possiblePairsTokenInfo = await multiChainWallet.getPossiblePairsTokenInfo({
            tokens,
            routeMap,
            inputToken,
        });

        const routes = await multiChainWallet.getRoutes({
            jupiter,
            inputToken,
            outputToken,
            inputAmount: 1, // 1 unit in UI
            slippage: 1, // 1% slippage
        });

        //await executeSwap({ jupiter, routeInfo: routes!.routesInfos[0] });
        if (routes) {
            res.status(httpStatus.FOUND).json({
                status: true,
                statusCode: httpStatus.FOUND,
                routes: routes,
            });
        } else {
            res
                .status(httpStatus.NOT_FOUND)
                .send(
                    new ApiError(
                        httpStatus.NOT_FOUND,
                        "We are facing some error, please try again"
                    )
                );
        }
    } catch (err) {
        res
            .status(httpStatus.NOT_FOUND)
            .send(new ApiError(httpStatus.NOT_FOUND, err));
    }
});





router.get("/hdWallet/recoverWallet", async (req, res) => {
  const addr = hdWallet.recoverWallet(req.query.phrase);
  if (addr) {
    res
      .status(httpStatus.CREATED)
      .json({ status: true, statusCode: httpStatus.CREATED, address: addr });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, "Invalid mnemonic"));
  }
});

router.get("/token/getBlockNumber", async (req, res) => {
  let bn = await tokenList.getBlockNumber();
  if (bn) {
    res.status(httpStatus.FOUND).json({
      status: true,
      statusCode: httpStatus.FOUND,
      blockNumber: bn.toString(),
    });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getTokenInfo", async (req, res) => {
  let tokenName = await tokenList.getTokenName(req.query.address);
  let tokenSymbol = await tokenList.getTokenSymbol(req.query.address);
  let priceETH = await tokenList.getPriceETHV2(req.query.address);
  let priceUSD = await tokenList.getPriceUSDV2(req.query.address);
  if (tokenName) {
    res
      .status(httpStatus.FOUND)
      .json({ status: true, statusCode: httpStatus.FOUND, tokenName, tokenSymbol, priceETH, priceUSD });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getTokenName", async (req, res) => {
  let tokenName = await tokenList.getTokenName(req.query.address);
  if (tokenName) {
    res
      .status(httpStatus.FOUND)
      .json({ status: true, statusCode: httpStatus.FOUND, tokenName });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getTokenSymbol", async (req, res) => {
  let tokenSymbol = await tokenList.getTokenSymbol(req.query.address);
  if (tokenSymbol) {
    res
      .status(httpStatus.FOUND)
      .json({ status: true, statusCode: httpStatus.FOUND, tokenSymbol });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getPriceETHV2", async (req, res) => {
  let price = await tokenList.getPriceETHV2(req.query.address);
  if (price) {
    res.status(httpStatus.FOUND).json({
      status: true,
      statusCode: httpStatus.FOUND,
      price: price.toString(),
    });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getPriceUSDV2", async (req, res) => {
  let price = await tokenList.getPriceUSDV2(req.query.address);
  if (price) {
    res.status(httpStatus.FOUND).json({
      status: true,
      statusCode: httpStatus.FOUND,
      price: price.toString(),
    });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getPriceETHV3", async (req, res) => {
  let price = await tokenList.getPriceETHV3(req.query.address);
  if (price) {
    res.status(httpStatus.FOUND).json({
      status: true,
      statusCode: httpStatus.FOUND,
      price: price.toString(),
    });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/token/getPriceUSDV3", async (req, res) => {
  let price = await tokenList.getPriceUSDV3(req.query.address);
  if (price) {
    res.status(httpStatus.FOUND).json({
      status: true,
      statusCode: httpStatus.FOUND,
      price: price.toString(),
    });
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .send(
        new ApiError(
          httpStatus.NOT_FOUND,
          "We are facing some error, please try again"
        )
      );
  }
});

router.get("/action/getBalance", async (req, res) => {
  try {
    let balance = await action.getBalance(req.query.address);
    if (balance) {
      res.status(httpStatus.FOUND).json({
        status: true,
        statusCode: httpStatus.FOUND,
        balance: balance.toString(),
      });
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .send(
          new ApiError(
            httpStatus.NOT_FOUND,
            "We are facing some error, please try again"
          )
        );
    }
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, err));
  }
});

router.get("/action/getTokenBalance", async (req, res) => {
  try {
    let balance = await action.getTokenBalance(req.query.walletAddress, req.query.tokenAddress);
    if (balance) {
      res.status(httpStatus.FOUND).json({
        status: true,
        statusCode: httpStatus.FOUND,
        balance: balance.toString(),
      });
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .send(
          new ApiError(
            httpStatus.NOT_FOUND,
            "We are facing some error, please try again"
          )
        );
    }
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, err));
  }
});


router.get("/action/transferFund", async (req, res) => {
  try {
    let result = await action.transferFund(req.query.sender, req.query.privateKey, req.query.reciever, req.query.amount);
    if (result) {
      res.status(httpStatus.FOUND).json({
        status: true,
        statusCode: httpStatus.FOUND,
        result: result,
      });
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .send(
          new ApiError(
            httpStatus.NOT_FOUND,
            "We are facing some error, please try again"
          )
        );
    }
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, err));
  }
});

router.get("/action/transferToken", async (req, res) => {
  try {
    let result = await action.transferToken(req.query.sender, req.query.privateKey, req.query.tokenAddress, req.query.reciever, req.query.amount);
    if (result) {
      res.status(httpStatus.FOUND).json({
        status: true,
        statusCode: httpStatus.FOUND,
        result: result,
      });
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .send(
          new ApiError(
            httpStatus.NOT_FOUND,
            "We are facing some error, please try again"
          )
        );
    }
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .send(new ApiError(httpStatus.NOT_FOUND, err));
  }
});

app.use(cors());

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



