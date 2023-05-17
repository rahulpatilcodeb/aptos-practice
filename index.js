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
// const gariCoinType = '0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::gari_coin::GariCoin';
const aptosCoinType = '0x1::aptos_coin::AptosCoin';
const goXoYo1CoinType = '0xe60c54467e4c094cee951fde4a018ce1504f3b0f09ed86e6c8d9811771c6b1f0::coin::T';

const amountIn1Coin = 100000000;

const aptosChingariClient = new AptosChingari(
    'https://rpc.ankr.com/premium-http/aptos_testnet/fb86dfe08c91679888512d9e458a82021921afaa10c9d66c62ed3d7cec207abd/v1',
    payerAccount.publicKey,
    // payerAccount.publicKey
);
const aptosChingariTransactions = new AptosChingariTransactions();
const aptosChingariNFT = new AptosChingariNFT();

const transactionData1 = [
    {
        toUserId: '61d44e5ce2ba1b097cc66ba3',
        fromUserId: 'chingari',
        fromPublicKey: '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: '0x27be69905d09f078ba0fc26975d5a6099b7f25556c4f8a9222723c0d20c1809b',
        toAssociatedAccountPublickey: '0x27be69905d09f078ba0fc26975d5a6099b7f25556c4f8a9222723c0d20c1809b',
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
        id: 'aedb54f0-7acc-4bf0-93f6-c2b9e593c8bb',
        created_at: "2023-05-09T05:08:18.612Z",
        updated_at: "2023-05-09T05:08:18.612Z"
    },
    {
        toUserId: '61f5260ab4736a08fa3d3413',
        fromUserId: 'chingari',
        fromPublicKey: '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: '0xc1cd9efcf083e2bc8eb1a8e975959a131d4ce78fa9b96db426f4653d2560f353',
        toAssociatedAccountPublickey: '0xc1cd9efcf083e2bc8eb1a8e975959a131d4ce78fa9b96db426f4653d2560f353',
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
        id: '706062ca-14f2-47dd-9ba5-088e8c4948c3',
        created_at: "2023-05-09T05:08:18.612Z",
        updated_at: "2023-05-09T05:08:18.612Z"
    },
    {
        toUserId: '6239f8ed7658af099842ab9e',
        fromUserId: 'chingari',
        fromPublicKey: '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51',
        toPublicKey: '0x300346b8c8de495b9914048110dc40f04db95c6295b9852a882ba95024264553',
        toAssociatedAccountPublickey: '0x300346b8c8de495b9914048110dc40f04db95c6295b9852a882ba95024264553\n',
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
        id: 'ea39aca6-6697-4f5f-ae6f-d2ef59cf5272',
        created_at: "2023-05-09T05:08:18.612Z",
        updated_at: "2023-05-09T05:08:18.612Z"
    }
]

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
    const transactionDetails = await chingariAptosClient.getTransactionDetail('0x2bf956d32eb63aa47f81ea64537a13c7e2c38aa2f68846a9a82a3d703b2749ee');
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
        chingariClient: aptosChingariClient,
        price: 1,
        tokenName: 'Test Badge 1',
        userAddress: user1Account.publicKey,
        coinType: goXoYo1CoinType,
        memo: 'Test Badge 1 memo',
    });
    console.log("rawTxnBase64", rawTxnBase64);
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        payerAccount.privateKey.substring(2)
    );
    console.log("payerAuth", payerAuth);
    const userAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        user1Account.privateKey.substring(2)
    );
    console.log("userAuth", userAuth);
    const response = await aptosChingariClient.createMultiAgentTXAndSubmit(
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth,
        true
    );
    // const response = await chingariAptosClient.createMultiAgentTXAndSubmit_v2({
    //     allAuths: [{
    //         address: payerAccount.publicKey,
    //         authBase64: payerAuth,
    //         type: AUTHENTICATOR_ACCOUNT_TYPE.Sender
    //     }, {
    //         address: user1Account.publicKey,
    //         authBase64: userAuth,
    //         type: AUTHENTICATOR_ACCOUNT_TYPE.Secondary
    //     }],
    //     multiAgentRawTx: rawTxnBase64,
    //     simulation: true
    // }).catch((error) => { console.log("error >>> ", error); })
    console.log(164, response);
}

function getReceiversFromUint8Array(uint8Array) {
    const receivers = [];
    while (uint8Array[0]--) {
        const startIndex = receivers.length * 32 + 1;
        receivers.push(uint8Array.slice(startIndex, startIndex + 32).reduce((previousValue, currentValue) => previousValue + currentValue.toString(16).padStart(2, 0), '0x'));
    }
    return receivers;
}

function getNumbersFromUint8Array(uint8Array) {
    const numbers = [];
    const powersOf256 = [1, 256];
    for (let i = 2; i < 8; i++) powersOf256[i] = powersOf256[i - 1] * 256;
    while (uint8Array[0]--) {
        const startIndex = numbers.length * 8 + 1;
        numbers.push(uint8Array.slice(startIndex, startIndex + 8).reduce((previousValue, currentValue, currentIndex) => previousValue + currentValue * powersOf256[currentIndex], 0));
    }
    return numbers;
}

async function batchAirdrop() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: payerAccount.publicKey,
        to: transactionData1.map((value) => value.toPublicKey),
        amount: transactionData1.map((value) => parseInt(value.coins)),
        commission: [0, 0, 0],
        count: 3,
        coinType: goXoYo1CoinType,
        feePayer: payerAccount.publicKey,
        memo: `Tip ${Date.now()}`
    });
    console.log(rawTxnBase64);
}

async function test2() {
    // const rawTxnBase64  = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
    //     chingariClient: chingariAptosClient,
    //     from: '0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01',
    //     to: ['0x37f2b3a1e2a47cf09fe9720b3a74a44e678c64dce55f21dd492ccb03be7558e1'],
    //     amount: [256],
    //     commission: [Math.round(256 * 0.05)],
    //     count: 1,
    //     coinType: goXoYo1CoinType,
    //     feePayer: payerAccount.publicKey,
    //     memo: `Tip ${Date.now()}`
    // });
    // console.log(309, rawTxnBase64);

    const deserializedMultiAgentRawTransaction = deserializeMultiAgentRawTransaction({ multiAgentTxnBase64: 'AJxZR9I1/KivDtnJDcpQGWwRLaxAfrGdh9kofbk9fi1RugEAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EHcGF5ZXJfMzB0cmFuc2Zlcl93aXRoX2ZlZV9wYXllcl9tdWx0aXBsZV93aXRoX2NvbW1pc3Npb24BB+YMVEZ+TAlM7pUf3koBjOFQTzsPCe2G5sjZgRdxxrHwBGNvaW4BVAAGCAEAAAAAAAAAIQEM8X3QSN/CrqJ0mkOTzUpC1yLXKjEvzhpt1pJP7E6eAQkBZAAAAAAAAAAJAQUAAAAAAAAAAQASEVRpcCAxNjgzNjQwNzE2Mzcw0AcAAAAAAABkAAAAAAAAAPFaWmQAAAAAAgE38rOh4qR88J/pcgs6dKROZ4xk3OVfId1JLMsDvnVY4Q==' });
    const [, receivers, amount, commission, , memo] = deserializedMultiAgentRawTransaction.raw_txn.payload.value.args;
    console.log('receivers', getReceiversFromUint8Array(receivers));
    console.log('amount', getNumbersFromUint8Array(amount));
    console.log('commission', getNumbersFromUint8Array(commission));
    console.log('memo', String.fromCharCode(...memo.slice(1)));
}

async function getAuthentication() {
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        'AJxZR9I1/KivDtnJDcpQGWwRLaxAfrGdh9kofbk9fi1RvQEAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EHcGF5ZXJfMzB0cmFuc2Zlcl93aXRoX2ZlZV9wYXllcl9tdWx0aXBsZV93aXRoX2NvbW1pc3Npb24BB+YMVEZ+TAlM7pUf3koBjOFQTzsPCe2G5sjZgRdxxrHwBGNvaW4BVAAGCAEAAAAAAAAAIQE38rOh4qR88J/pcgs6dKROZ4xk3OVfId1JLMsDvnVY4QkBZAAAAAAAAAAJAQUAAAAAAAAAAQASEVRpcCAxNjgzNjU5ODQ0MjMx0AcAAAAAAABkAAAAAAAAAKalWmQAAAAAAgEM8X3QSN/CrqJ0mkOTzUpC1yLXKjEvzhpt1pJP7E6eAQ==',
        ['0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01'],
        '0xb67c14f170d4703eb3db8c09036741b1c88b19b856357cf3036b023afdbe5981'.substring(2)
    );
    console.log(320, payerAuth);
}

async function getGasFees() {
    const gasFees = await chingariAptosClient.fetchGasUnitPrice();
    console.log(gasFees);
}

async function checkUser() {
    const info = await chingariAptosClient.getAccountInfo('0x05904ef6b4b5d911f9b27fd4ea1101b7f5c393f17ca4d71b16e265116f788fd0');
    const { message } = info;
    console.log(330, info);
    console.log(332, message);
}

async function test() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: payerAccount.publicKey,
        to: [user1Account.publicKey, user2Account.publicKey],
        amount: [10, 10],
        commission: [1, 1],
        count: 2,
        coinType: goXoYo1CoinType,
        // feePayer: payerAccount.publicKey,
        memo: 'test'
    });
    // const senderAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(rawTxnBase64, [payerAccount.publicKey], payerAccount.privateKey.substring(2));
    // const senderAuth = await chingariAptosClient.getRawTransactionAuthentication(rawTxnBase64,payerAccount.privateKey.substring(2));
    const senderAuth = await chingariAptosClient.getTransactionAuthentication(rawTxnBase64, [payerAccount.publicKey], payerAccount.privateKey.substring(2));
    const response = await chingariAptosClient.signAndSendEncodedTransaction(rawTxnBase64, [payerAccount.privateKey.substring(2)]);
    console.log(343, response);
}

function getDetailsFromRawTransaction(rawTxnBase64) {
    const deserializedMultiAgentRawTransaction =
        deserializeMultiAgentRawTransaction({
            multiAgentTxnBase64: rawTxnBase64,
        });
    const [, receiversArg, amountArg, commissionArg, , memoArg] =
        deserializedMultiAgentRawTransaction.raw_txn.payload.value.args;
    const receivers = getReceiversFromUint8Array(receiversArg);
    const amount = getNumbersFromUint8Array(amountArg);
    const commission = getNumbersFromUint8Array(commissionArg);
    const memo = String.fromCharCode(...memoArg.slice(1));
    return { receivers, amount, commission, memo };
}

// const details = getDetailsFromRawTransaction('AJxZR9I1/KivDtnJDcpQGWwRLaxAfrGdh9kofbk9fi1R5AEAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EHcGF5ZXJfMzB0cmFuc2Zlcl93aXRoX2ZlZV9wYXllcl9tdWx0aXBsZV93aXRoX2NvbW1pc3Npb24BB+YMVEZ+TAlM7pUf3koBjOFQTzsPCe2G5sjZgRdxxrHwBGNvaW4BVAAGCAEAAAAAAAAAIQGcWUfSNfyorw7ZyQ3KUBlsES2sQH6xnYfZKH25PX4tUQkBAJQ1dwAAAAAJAR4AAAAAAAAAAQBAP3sidHlwZSI6ImV4dGVybmFsIiwiaWQiOiIxNWNmZjNiYi0zZDA2LTRmNmItYWVlZC1hMzM1ZWQ2YjM3NzMifdAHAAAAAAAAZAAAAAAAAAApTl5kAAAAAAIBDPF90Ejfwq6idJpDk81KQtci1yoxL84abdaST+xOngE=');
// console.log(364, details);

// chingariAptosClient.getTransactionsBalanceUpdateForAddress('0xe60c54467e4c094cee951fde4a018ce1504f3b0f09ed86e6c8d9811771c6b1f0').then((value)=>{
//     console.log(value);
// })

async function test() {
    const { rawTxnBase64 } = await aptosChingariTransactions.rawTransactionCoinTransferMultiple({
        chingariClient: chingariAptosClient,
        from: payerAccount.publicKey,
        to: [user2Account.publicKey],
        amount: [amountIn1Coin],
        commission: [amountIn1Coin * 0.05],
        count: 1,
        coinType: goXoYo1CoinType,
        // feePayer: payerAccount.publicKey,
        memo: `Test ${Date.now()}`
    });

    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [],
        payerAccount.privateKey.substring(2)
    );

    chingariAptosClient.submitRawTxn(rawTxnBase64, payerAuth).then((value) => {
        console.log(value);
    })
}

async function mintBadgeTest() {
    const { rawTxnBase64 } = await aptosChingariNFT.mintBadge({
        chingariClient: aptosChingariClient,
        adminAddress: payerAccount.publicKey,
        userAddress: user1Account.publicKey,
        tokenName: 'Test Badge 1',
        price: 10,
        isFree: false,
        memo: `mintBadge ${Date.now()}`,
        coinType: goXoYo1CoinType,
    });
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [user1Account.publicKey],
        payerAccount.privateKey.substring(2)
    );
    const userAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [], //[user1Account.publicKey],
        user1Account.privateKey.substring(2)
    );
    console.log({ rawTxnBase64 });
    console.log({ payerAuth });
    console.log({ userAuth });
    const { hash, error, message } = await aptosChingariClient.createMultiAgentTXAndSubmit(
        rawTxnBase64,
        payerAuth,
        user1Account.publicKey,
        userAuth,
        true
    );
    console.log(421, hash, error, message);
}

async function getTransactionsTest() {
    const transactions = await aptosChingariClient.getTransactionsForAddress('0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51', { start: 0, limit: 101 });
    console.log(429, transactions.length);
    transactions.forEach((value) => {
        console.log(430, value.version);
    })
}

nfts();