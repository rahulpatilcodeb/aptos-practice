const { AptosChingari, AptosChingariTransactions } = require('chingari-aptos');

const payerAccount = {
    privateKey: '0x2ce722ef94fa9ff20b3959123eb3256c20c501ca16df7d5a2f45187e8005abd7',
    publicKey: '0x9c5947d235fca8af0ed9c90dca50196c112dac407eb19d87d9287db93d7e2d51'
}
const userAccount = {
    privateKey: '0xb67c14f170d4703eb3db8c09036741b1c88b19b856357cf3036b023afdbe5981',
    publicKey: '0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01'
}

const dogeCoinType = '0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::dogecoinV2::DogeCoin';
const gariCoinType = '0xe60c54467e4c094cee951fde4a018ce1504f3b0f09ed86e6c8d9811771c6b1f0::coin::T';
const aptosCoinType = '0x1::aptos_coin::AptosCoin';
const coins = 100000000;

const chingariClient = new AptosChingari(
    'https://rpc.ankr.com/premium-http/aptos_testnet/fb86dfe08c91679888512d9e458a82021921afaa10c9d66c62ed3d7cec207abd/v1',
    payerAccount.publicKey,
    payerAccount.publicKey
);
const aptosChingariTransactions = new AptosChingariTransactions();

async function run() {
    const aptosBalance = await chingariClient.getTokenBalance(payerAccount.publicKey, aptosCoinType);
    const dogeBalance = await chingariClient.getTokenBalance(payerAccount.publicKey, dogeCoinType);
    const gariBalance = await chingariClient.getTokenBalance(payerAccount.publicKey, gariCoinType);
    console.log(JSON.stringify({
        aptosBalance: aptosBalance / coins,
        dogeBalance: dogeBalance / (coins ** 2 * 100),
        gariBalance: gariBalance / coins
    }));

    const { rawTxnBase64 } = await aptosChingariTransactions.registerTokenToAddress({
        chingariClient,
        accountAddress: userAccount.publicKey,
        feePayer: payerAccount.publicKey
    });
    console.log(
        rawTxnBase64,
        [userAccount.publicKey],
        payerAccount.privateKey.substring(2)
    );
    const payerAuth = await aptosChingariTransactions.getTransactionAuthenticationFromSigners(
        rawTxnBase64,
        [userAccount.publicKey],
        payerAccount.privateKey.substring(2)
    );
    console.log({ payerAuth });
    // const userAuth = await new AptosChingariTransactions().getTransactionAuthenticationFromSigners(
    //     rawTxnBase64,
    //     ['0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01'],
    //     'b67c14f170d4703eb3db8c09036741b1c88b19b856357cf3036b023afdbe5981'
    // );
    // console.log({
    //     rawTxnBase64,
    //     payerAuth,
    //     userAccount: '0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01',
    //     userAuth
    // });
    // const hash = await new AptosChingariTransactions().createMultiAgentTXAndSubmit(
    //     chingariClient,
    //     rawTxnBase64,
    //     payerAuth,
    //     '0x0cf17dd048dfc2aea2749a4393cd4a42d722d72a312fce1a6dd6924fec4e9e01',
    //     userAuth
    // );
    // const hash = await chingariClient.signAndSendEncodedTransaction(rawTxnBase64, [receiverAccount.privateKey.substring(2)]);
    // const hash = await chingariClient.signAndSendRawTransaction({ rawTransaction: rawTxnBase64, senderPrivateKey: senderAccount.privateKey.substring(2) });
    // console.log(hash);
}

run();