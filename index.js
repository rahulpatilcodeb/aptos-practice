require('dotenv').config();
const { AptosChingari, AptosChingariTransactions } = require('aptos');

const payerAccount = {
    privateKey: process.env.PAYER_ACCOUNT_PRIVATE_KEY,
    publicKey: process.env.PAYER_ACCOUNT_PUBLIC_KEY
}
const user1Account = {
    privateKey: '0xb67c14f170d4703eb3db8c09036741b1c88b19b856357cf3036b023afdbe5981',
    publicKey: '0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01'
}
const user2Account = {
    privateKey: '0xd50f2ff6b5f29a5642af5e426734678e3de2247a82afccd2e0e57aedca22b2b8',
    publicKey: '0x37f2b3a1e2a47cf09fe9720b3a74a44e678c64dce55f21dd492ccb03be7558e1'
}

// const dogeCoinType = '0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::dogecoinV2::DogeCoin';
// const gariCoinType = '0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::gari_coin::GariCoin';
const aptosCoinType = '0x1::aptos_coin::AptosCoin';
const goXoYo1CoinType = '0xe60c54467e4c094cee951fde4a018ce1504f3b0f09ed86e6c8d9811771c6b1f0::coin::T';

const amountIn1Coin = 100000000;

const chingariAptosClient = new AptosChingari(
    'https://rpc.ankr.com/premium-http/aptos_testnet/fb86dfe08c91679888512d9e458a82021921afaa10c9d66c62ed3d7cec207abd/v1',
    payerAccount.publicKey,
    payerAccount.publicKey
);
const aptosChingariTransactions = new AptosChingariTransactions();

async function transferCoins() {
    // returns raw Transaction for coin Transfer
    // const gariBalance = await chingariClient.getTokenBalance(payerAccount.publicKey, gariCoinType);
    // console.log({ aptosBalance: aptosBalance / coinsIn1Aptos });
    // console.log({ gariBalance: gariBalance / coinsIn1Gari });

    //to check if receiver is registered
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransfer({
        chingariClient,
        from: user1Account.publicKey,
        to: user2Account.publicKey,
        amount: 0.1 * coinsIn1Gari,
        feePayer: payerAccount.publicKey,
        coinType: gariCoinType
    });
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        payerAccount.privateKey.substring(2)
    );
    const userAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        user1Account.privateKey.substring(2)
    );
    const hash = await aptosChingariTransactions.createMultiAgentTXAndSubmit(
        chingariClient,
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth
    );
    console.log(hash);
}

async function registerWithGari() {
    const { rawTxnBase64 } = await aptosChingariTransactions.registerTokenToAddress({
        chingariClient,
        accountAddress: user2Account.publicKey,
        feePayer: payerAccount.publicKey,
        coinType: gariCoinType
    });
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user2Account.publicKey],
        payerAccount.privateKey.substring(2)
    );
    const userAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user2Account.publicKey],
        user2Account.privateKey.substring(2)
    );
    const hash = await aptosChingariTransactions.createMultiAgentTXAndSubmit(
        chingariClient,
        rawTxnBase64,
        payerAuth,
        user2Account.publicKey,
        userAuth
    );
    console.log(hash);
}

async function getTransactionDetails() {
    const transactionDetails = await chingariClient.getTransactionDetail('0x4385251194b1285b37e55b7cfa4beedc66f39fdee746f16631377055222086a5');
    console.log(transactionDetails);
}

async function tip() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: user1Account.publicKey,
        to: [payerAccount.publicKey, user2Account.publicKey],
        count: 2,
        amount: [2 * amountIn1Coin, 1 * amountIn1Coin],
        feePayer: payerAccount.publicKey,
        coinType: goXoYo1CoinType,
    });
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        payerAccount.privateKey.substring(2)
    );
    const userAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        user1Account.privateKey.substring(2)
    );
    const hash = await aptosChingariTransactions.createMultiAgentTXAndSubmit(
        chingariAptosClient,
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth
    );
    console.log(JSON.stringify(hash));
}

// registerWithGari();
// transferCoins();
// getTransactionDetails();
tip();

// chingariAptosClient.getTokenBalance(payerAccount.publicKey, goXoYo1CoinType).then((value) => {
//     const balance = value;
//     const balanceInAptosCoin = balance / amountIn1Coin;
//     console.log(135, balance, balanceInAptosCoin);
// });