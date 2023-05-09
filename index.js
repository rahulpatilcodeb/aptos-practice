require('dotenv').config();
const { AptosChingari, AptosChingariTransactions, AptosChingariNFT, AUTHENTICATOR_ACCOUNT_TYPE, deserializeMultiAgentRawTransaction } = require('aptos');

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
const gariCoinType = '0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::gari_coin::GariCoin';
const aptosCoinType = '0x1::aptos_coin::AptosCoin';
const goXoYo1CoinType = '0xe60c54467e4c094cee951fde4a018ce1504f3b0f09ed86e6c8d9811771c6b1f0::coin::T';

const amountIn1Coin = 100000000;

const chingariAptosClient = new AptosChingari(
    'https://rpc.ankr.com/premium-http/aptos_testnet/fb86dfe08c91679888512d9e458a82021921afaa10c9d66c62ed3d7cec207abd/v1',
    // payerAccount.publicKey,
    // payerAccount.publicKey
);
const aptosChingariTransactions = new AptosChingariTransactions();
const aptosChingariNFT = new AptosChingariNFT();

const transactionData = [
    {
        toUserId: '61d44e5ce2ba1b097cc66ba3',
        fromUserId: 'chingari',
        fromPublicKey:
            '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: 'AxKfdaGLHuqBKe7QrcvL8mE5WzQNVWSAbmUqsBAtGfW',
        toAssociatedAccountPublickey:
            '8ccJ9FDeD6posaLxfCD8RPukSN2wjjC2sJ8dPUwirwFn',
        status: 'draft',
        case: 'mining',
        coins: '27648444',
        totalTransactionAmount: '27648444',
        chinagriCommission: '0',
        solanaFeeInLamports: '0',
        meta: { airdropType: 'mining', subscriptionWithdrawableAmount: 0 },
        aptosFee: '0',
        toChain: 'aptos',
        signature: null,
        chain: null,
        remarks: null,
        id: 'b99ae61c-f587-4900-8235-e3f54a30c32e',
        created_at: '2023-05-08T12:20:18.418Z',
        updated_at: '2023-05-08T12:20:18.418Z',
    },
    {
        toUserId: '61f5260ab4736a08fa3d3413',
        fromUserId: 'chingari',
        fromPublicKey:
            '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: 'EydZmtgdu7YeagWbYSrpbY5ao6n1xHML6Mi5ADw6dEUj',
        toAssociatedAccountPublickey:
            '8ejtsaftduDfUqzcHUC147wb2ZzScpszokX1aYr5aSvV',
        status: 'draft',
        case: 'mining',
        coins: '65553137',
        totalTransactionAmount: '65553137',
        chinagriCommission: '0',
        solanaFeeInLamports: '0',
        meta: { airdropType: 'mining', subscriptionWithdrawableAmount: 0 },
        aptosFee: '0',
        toChain: 'aptos',
        signature: null,
        chain: null,
        remarks: null,
        id: '30d59ce1-0aa9-4b5b-9c30-90797f5fc1c2',
        created_at: '2023-05-08T12:20:18.418Z',
        updated_at: '2023-05-08T12:20:18.418Z',
    },
    {
        toUserId: '6239f8ed7658af099842ab9e',
        fromUserId: 'chingari',
        fromPublicKey:
            '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: '6c42QeypBJCzkDZtwem12Y2PaPRk5ckRiA5sPyUQ7jiF',
        toAssociatedAccountPublickey:
            'E9WctTHYGWxHxJD4UXFu2KzrDbmMGcavteziphqGGSrV',
        status: 'draft',
        case: 'mining',
        coins: '494954463',
        totalTransactionAmount: '494954463',
        chinagriCommission: '0',
        solanaFeeInLamports: '0',
        meta: { airdropType: 'mining', subscriptionWithdrawableAmount: 0 },
        aptosFee: '0',
        toChain: 'aptos',
        signature: null,
        chain: null,
        remarks: null,
        id: 'd0ddbe16-2664-4e19-9396-18b94265563b',
        created_at: '2023-05-08T12:20:18.418Z',
        updated_at: '2023-05-08T12:20:18.418Z',
    },
];

function getNewAccount() {
    return aptosChingariTransactions.createAndSendNewAccountTransaction({
        chingariClient: chingariAptosClient,
        senderPrivateKey: payerAccount.privateKey.substring(2),
        simulation: true,
    });
}

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
        chingariClient: chingariAptosClient,
        accountAddress: user1Account.publicKey,
        feePayer: payerAccount.publicKey,
        coinType: goXoYo1CoinType
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
    return await chingariAptosClient.createMultiAgentTXAndSubmit(
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth,
        true
    );
}

async function getTransactionDetails() {
    const transactionDetails = await chingariClient.getTransactionDetail('0x4385251194b1285b37e55b7cfa4beedc66f39fdee746f16631377055222086a5');
    console.log(transactionDetails);
}

async function tip() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: user1Account.publicKey,
        to: [user2Account.publicKey],
        amount: [amountIn1Coin],
        commission: [amountIn1Coin * 0.05],
        count: 1,
        coinType: goXoYo1CoinType,
        feePayer: payerAccount.publicKey,
        memo: `Tip ${Date.now()}`
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
    const { hash, error, message } = await chingariAptosClient.createMultiAgentTXAndSubmit(
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth,
        true
    );
    console.log(134, hash, error, message);
}

async function nfts() {
    // return aptosChingariNFT.getBadgeList({ chingariClient: chingariAptosClient });
    // return aptosChingariNFT.getCoinType({ chingariClient: chingariAptosClient });
    const { rawTxnBase64 } = await aptosChingariNFT.mintBadge({
        adminAddress: payerAccount.publicKey,
        chingariClient: chingariAptosClient,
        price: 1,
        tokenName: 'Test Badge 1',
        userAddress: user1Account.publicKey,
        coinType: gariCoinType,
        memo: 'Test Badge 1 memo',
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
    // const response = await chingariAptosClient.createMultiAgentTXAndSubmit(
    //     rawTxnBase64,
    //     payerAuth,
    //     user1Account.publicKey,
    //     userAuth,
    //     true
    // );
    const response = await chingariAptosClient.createMultiAgentTXAndSubmit_v2({
        allAuths: [{
            address: payerAccount.publicKey,
            authBase64: payerAuth,
            type: AUTHENTICATOR_ACCOUNT_TYPE.Sender
        }, {
            address: user1Account.publicKey,
            authBase64: userAuth,
            type: AUTHENTICATOR_ACCOUNT_TYPE.Secondary
        }],
        multiAgentRawTx: rawTxnBase64,
        simulation: true
    });
    console.log(164, response);
}

// registerWithGari();
// transferCoins();
// getTransactionDetails();
// tip();
// nfts();

function getHexFromUint8Array(uint8Array, hexString = '') {
    uint8Array.forEach((byte) => hexString += byte.toString(16).padStart(2, 0));
    return hexString;
}

function getReceivers(uint8Array, receivers = []) {
    while (uint8Array[0]--) {
        const startIndex = receivers.length * 32 + 1;
        receivers.push(getHexFromUint8Array(uint8Array.slice(startIndex, startIndex + 32)));
    }
    return receivers;
}

function getNumbersFromUint8Array(uint8Array, numbers = []) {
    const powersOf256 = [1, 256];
    for (let i = 2; i < 8; i++) powersOf256[i] = powersOf256[i - 1] * 256;

    while (uint8Array[0]--) {
        const startIndex = numbers.length * 8 + 1;
        const numberArray = uint8Array.slice(startIndex, startIndex + 8);
        let number = 0;
        for (let i = 0; i < 8; i++) {
            number += numberArray[i] * powersOf256[i];
        }
        numbers.push(number);
    }
    return numbers;
}

async function batchAirdrop() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: user1Account.publicKey,
        to: [user2Account.publicKey, user2Account.publicKey, user2Account.publicKey],
        amount: [27648444, 65553137, 494954463],
        commission: [0, 0, 0],
        count: 1,
        coinType: goXoYo1CoinType,
        feePayer: payerAccount.publicKey,
        memo: `Tip ${Date.now()}`
    });
    console.log(rawTxnBase64);
}

// aptosChingariTransactions.rawTransactionCoinTransferMultiple({
//     chingariClient: chingariAptosClient,
//     from: user1Account.publicKey,
//     to: [user2Account.publicKey, payerAccount.publicKey],
//     amount: [amountIn1Coin, amountIn1Coin],
//     commission: [amountIn1Coin * 0.05, amountIn1Coin * 0.05],
//     count: 2,
//     coinType: goXoYo1CoinType,
//     feePayer: payerAccount.publicKey,
//     memo: `Tip ${Date.now()}`
// }).then(({ rawTxnBase64 }) => {
//     const deserializedMultiAgentRawTransaction = deserializeMultiAgentRawTransaction({ multiAgentTxnBase64: rawTxnBase64 });
//     console.log(217, deserializedMultiAgentRawTransaction);
//     console.log(getNumbersFromUint8Array(deserializedMultiAgentRawTransaction.raw_txn.payload.value.args[2]));
//     console.log(getNumbersFromUint8Array(deserializedMultiAgentRawTransaction.raw_txn.payload.value.args[3]));
// });

batchAirdrop();