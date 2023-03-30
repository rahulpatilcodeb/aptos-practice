import { HexString } from "./sdk";
import { AptosChingari, keypairGenerate } from "./aptosClient";
import { AptosChingariTransactions } from './transaction'
import { AUTHENTICATOR_ACCOUNT_TYPE } from "./constant";
import { getTransactionToSignInBytes } from "./transaction/main";
import { deserializeMultiAgentRawTransaction, getSignedTxnAuth, stringToUint8Array, uint8ArrayToString } from "./helper";
export * from "./aptosClient";
export * from "./helper";
export * from "./transaction"

const rpc = new AptosChingari("https://rpc.ankr.com/premium-http/aptos_testnet/fb86dfe08c91679888512d9e458a82021921afaa10c9d66c62ed3d7cec207abd/v1", "");

const fetchbal = async (address: string) => {
    console.log("==>", await rpc.getAptosBalance(address))
}
const fetchCoinBal = async (address: string, tokenAddress?: string) => {
    console.log("Token Balance==>", await rpc.getTokenBalance(address))
}
const fetchTx = async (txHash: string) => {
    console.log("Tx==>", await rpc.getTransactionDetail(txHash))
}

const fetchGasUnitPrice = async () => {
    console.log("Price ==>", await rpc.fetchGasUnitPrice());
}

const getTransactionsForAddress = async (address: string) => {
    console.log("Transactions =>", await rpc.getTransactionsForAddress(address));

}

const newKeyPair = () => {
    console.log("Account =>", keypairGenerate())
}

const getAccountResources = async (addreess: string) => {
    console.log("resourcess==>", await rpc.getAccountInfo(addreess))
}


// transferAptos()

const checkUserRegistered = async (address: string, tokenAddress: string) => {
    console.log("User registration status =>", await rpc.checkUserRegistered(address, tokenAddress))
}

const createAndSendNewAccountTransaction = async () => {
    const newAcc = await new AptosChingariTransactions().createAndSendNewAccountTransaction({ chingariClient: rpc, senderPrivateKey: "0cf1d65c98982e9bab2eabe4eccf83375a331e43f87fa78c9a9b4f0a0bc75326" })
    console.log("newAcc ==>", newAcc);
}


const user1 = "0xe08234e97db755974ab88749e0c64c367208c39bf114769370a0b8aa85e8d850"
const user1Pk = "0cf1d65c98982e9bab2eabe4eccf83375a331e43f87fa78c9a9b4f0a0bc75326"

const user2 = "0x51224adaaeb3116bec84453ee3680dcd32a087946726c0795dfba455b56a4463"

const feePayer = "0x6aa517c9cac5e1d1131e1c3fc35267c5e7914412a5c4366a3d4c3ef945ed326c"
const feePayerPk = "1838f5f165f7f6f7a1232674700d04e505a7fe99386cb4dbffee2b0807e6fd6f"
const pk = "78b15a3fd9bbc3042de88e7101c2b2a382777cc8177a4e74194e19da986ed49e"

const transferAptos = async (toAddress: string) => {
    const hash = await new AptosChingariTransactions().createAndSendAptosToAccountTransaction({
        chingariClient: rpc,
        senderPrivateKey: user1Pk,
        toAddress: toAddress,
        amount: 1555555
    })
    console.log("hash ====>", hash);
}

const registerTokenToAddress = async (client: AptosChingari, accoutnAddress: string, feePayer?: string, coinAddress?: string) => {
    const rawTxn = await new AptosChingariTransactions().registerTokenToAddress(
        {
            chingariClient: client,
            accountAddress: accoutnAddress,
            feePayer: feePayer,
            // coinType: coinAddress
        }
    )
    console.log("RawTx ==>", rawTxn);
}

// const rawTransactionCoinTransfer = async () => {
//     const hash = await new AptosChingariTransactions().rawTransactionCoinTransfer(
//         {
//             chingariClient: rpc,
//             from: user1,
//             to: user2,
//             amount: 150500,
//             feePayer: feePayer
//         }
//     )
//     console.log("hash ==>", hash);

// }

const getTransactionAuthenticationFromSigners = async () => {
    const aptosTX = new AptosChingariTransactions()
    //  RawTx, SecondaryAddress, PayerPK
    const signedMulti = await aptosTX.getTransactionAuthenticationFromSigners(
        "AGqlF8nKxeHREx4cP8NSZ8XnkUQSpcQ2aj1MPvlF7TJsBwAAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EFcGF5ZXIccmVnaXN0ZXJfY29pbl93aXRoX2ZlZV9wYXllcgEHM0268OgVvRBqYccDGgBDdw7T4MRupbDPnLeFWletrroKZG9nZWNvaW5WMghEb2dlQ29pbgAA0AcAAAAAAACWAAAAAAAAAOxrJGQAAAAAAgHggjTpfbdVl0q4h0ngxkw2cgjDm/EUdpNwoLiqhejYUA==",
        [user1],
        feePayerPk
    )
    console.log("signedMulti ===>", signedMulti);

}

const getTransactionAuthenticationFromSigners2 = async () => {
    const aptosTX = new AptosChingariTransactions()
    //  RawTx, SecondaryAddress, SenderPK
    const signedMulti = await aptosTX.getTransactionAuthenticationFromSigners(
        "AGqlF8nKxeHREx4cP8NSZ8XnkUQSpcQ2aj1MPvlF7TJsBwAAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EFcGF5ZXIccmVnaXN0ZXJfY29pbl93aXRoX2ZlZV9wYXllcgEHM0268OgVvRBqYccDGgBDdw7T4MRupbDPnLeFWletrroKZG9nZWNvaW5WMghEb2dlQ29pbgAA0AcAAAAAAACWAAAAAAAAAOxrJGQAAAAAAgHggjTpfbdVl0q4h0ngxkw2cgjDm/EUdpNwoLiqhejYUA==",
        [user1],
        user1Pk
    )
    console.log("signedMulti ===>", signedMulti);

}

const createMultiAgentTXAndSubmit = async () => {
    // Params: RPC, RawTX, PayerAuth, SecondaryAddress, SednerAuth
    const signedMulti = await new AptosChingariTransactions().createMultiAgentTXAndSubmit(
        rpc,
        "AGqlF8nKxeHREx4cP8NSZ8XnkUQSpcQ2aj1MPvlF7TJsBwAAAAAAAAACWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EFcGF5ZXIccmVnaXN0ZXJfY29pbl93aXRoX2ZlZV9wYXllcgEHM0268OgVvRBqYccDGgBDdw7T4MRupbDPnLeFWletrroKZG9nZWNvaW5WMghEb2dlQ29pbgAA0AcAAAAAAACWAAAAAAAAAOxrJGQAAAAAAgHggjTpfbdVl0q4h0ngxkw2cgjDm/EUdpNwoLiqhejYUA==",
        "ACCgO+fkHGHUWwOs5CQUzF6TzoRDUESdeqlJH0aS8/8P8UD4BZ7ppwDPgtaQQeH//LqFhLSkRmUrs5sdOhcwS8jgbxK1+Xi7b08nvwi9WaYmiv8234Eas1AJ9if+MiIVVZEG",
        user1,
        "ACBp7IUfyUdEPPdwCk+s6XBSzfKV87tEobU+KH6EmMAQ60DxOjcanGs7mGAjaLwM0JN+pnRCzqBm82WEvoTHSSWDW387HyOvua2BCYoY1IdBqBRu70YYWxnGuu/Y6aViGrsG",
        true
    )
    console.log("signedMulti ===>", signedMulti);
}

const signAndSendSerializedTxn = async (rawtx: string, signature: [string]) => {
    const txhash = await rpc.signAndSendEncodedTransaction(rawtx, signature)
    console.log("txhash ==>", txhash);

}


const feePayerTransfer = async () => {
    //     aptosAcc1 address 0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371
    // aptosAcc2 address 0x295345a3773081215e6a9eb156227540525e3904b10ef00bd39ff1d066608e61
    // aptosAcc3 address 0x1791c00d574b4927cf8267d359316cc09698ef8c2ae8afb84e23cfca2cec4f1d
    // console.log("data", rpc.getAccountInfoFromPK("0x63e80ff47f06de72e8fdbfb95195c21815364176d0997bc160b2be65ad9bcdb5"))
    const tx = await new AptosChingariTransactions().rawTransactionCoinTransfer({
        chingariClient: rpc,
        from: "0x295345a3773081215e6a9eb156227540525e3904b10ef00bd39ff1d066608e61",
        to: "0x1791c00d574b4927cf8267d359316cc09698ef8c2ae8afb84e23cfca2cec4f1d",
        amount: 1,
        feePayer: "0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371",
        coinType: "0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371::test_coin::TestCoin",
    })
    // const tx = await new AptosChingariTransactions().registerTokenToAddress({
    //     accountAddress: "0x1791c00d574b4927cf8267d359316cc09698ef8c2ae8afb84e23cfca2cec4f1d",
    //     chingariClient: rpc,
    //     coinType: "0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371::test_coin::TestCoin",
    //     feePayer: "0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371",
    // });
    // const multiAgentTxn = deserializeMultiAgentRawTransaction({ multiAgentTxnBase64: tx.rawTxnBase64 });
    // const signedTxn = getTransactionToSignInBytes({ rawTxn: multiAgentTxn });
    console.log("tx", tx.rawTxnBase64);
    const signedTxn = "Xvo8TwL4Og9LLWn8lcYHzAKCXMTnvlNu8Jkt8FDZ5nwAWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EiAAAAAAAAAAJZ6H5qU0USIKXxVGqSnpAgscdX6Km27Dp2Y33gBfmzcQVwYXllchd0cmFuc2Zlcl93aXRoX2ZlZV9wYXllcgEHWeh+alNFEiCl8VRqkp6QILHHV+iptuw6dmN94AX5s3EJdGVzdF9jb2luCFRlc3RDb2luAAIgF5HADVdLSSfPgmfTWTFswJaY74wq6K+4TiPPyizsTx0IAQAAAAAAAADQBwAAAAAAAJYAAAAAAAAAj4IaZAAAAAACASlTRaN3MIEhXmqesVYidUBSXjkEsQ7wC9Of8dBmYI5h";
    // console.log("signedTx", tx.signedTxn);
    //sign by acc2
    const authBase64 = await rpc.getRawTransactionAuthentication(tx.rawTxnBase64, "2cb0bc8971596507a824afadc225c40facbe7b3aa07a41ff8da071910fb97627");
    //sign by acc1
    const authBase64_2 = await rpc.getRawTransactionAuthentication(tx.rawTxnBase64, "0x63e80ff47f06de72e8fdbfb95195c21815364176d0997bc160b2be65ad9bcdb5");
    console.log("authBase64", authBase64);
    console.log("authBase64_2", authBase64_2);
    // const hash = await rpc.createMultiAgentTXAndSubmit_v2({
    //     allAuths: [
    //         {
    //             address: "0x295345a3773081215e6a9eb156227540525e3904b10ef00bd39ff1d066608e61",
    //             authBase64: authBase64,
    //             type: AUTHENTICATOR_ACCOUNT_TYPE.Secondary
    //         },
    //         {
    //             address: "0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371",
    //             authBase64: authBase64_2,
    //             type: AUTHENTICATOR_ACCOUNT_TYPE.Sender
    //         }], multiAgentRawTx: tx.rawTxnBase64
    // });
    // console.log("hash", hash);
}

// const simulateTransaction = async () => {
//     const aptosTX = new AptosChingariTransactions()
//     const simRes = await aptosTX.simulateTransaction(
//         rpc,
//         "0cf1d65c98982e9bab2eabe4eccf83375a331e43f87fa78c9a9b4f0a0bc75326",
//         "4II06X23VZdKuIdJ4MZMNnIIw5vxFHaTcKC4qoXo2FA7AAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQRjb2luCHRyYW5zZmVyAQczTbrw6BW9EGphxwMaAEN3DtPgxG6lsM+ct4VaV62uugpkb2dlY29pblYyCERvZ2VDb2luAAIgUSJK2q6zEWvshEU+42gNzTKgh5RnJsB5XfukVbVqRGMI5EsCAAAAAADQBwAAAAAAAJYAAAAAAAAAT5UdZAAAAAAC")
//     console.log(" simRes ==>", simRes);

// }

const createAndSendCoinTransferToAccountTransaction = async () => {
    const aptosTX = new AptosChingariTransactions()
    const res = await aptosTX.createAndSendCoinTransferToAccountTransaction({
        chingariClient: rpc,
        senderPrivateKey: user1Pk,
        toAddress: "0x3556bb69cb92fb04236741876af8ce3e7cf1208bc5e9b933bebc1507831c5890",
        amount: 1555,
        simulation: true
    })
    console.log("res ==>", res);

}

const submitRawTransaction = async () => {
    const aptosTX = new AptosChingariTransactions()
    const res = await aptosTX.submitRawTransaction({
        chingariClient: rpc,
        rawTransaction: "4II06X23VZdKuIdJ4MZMNnIIw5vxFHaTcKC4qoXo2FBEAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQRjb2luCHRyYW5zZmVyAQczTbrw6BW9EGphxwMaAEN3DtPgxG6lsM+ct4VaV62uugpkb2dlY29pblYyCERvZ2VDb2luAAIgUSJK2q6zEWvshEU+42gNzTKgh5RnJsB5XfukVbVqRGMI5EsCAAAAAADQBwAAAAAAAJYAAAAAAAAAtCojZAAAAAAC",
        senderPrivateKey: user1Pk,
        simulation: true
    })
    console.log("res ==>", res);
}
// submitRawTransaction()
// createAndSendCoinTransferToAccountTransaction()
// createAndSendNewAccountTransaction()




// transferAptos("0x51224adaaeb3116bec84453ee3680dcd32a087946726c0795dfba455b56a4463")
// signAndSendSerializedTxn(
//     "4II06X23VZdKuIdJ4MZMNnIIw5vxFHaTcKC4qoXo2FBDAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQRjb2luCHRyYW5zZmVyAQczTbrw6BW9EGphxwMaAEN3DtPgxG6lsM+ct4VaV62uugpkb2dlY29pblYyCERvZ2VDb2luAAIgUSJK2q6zEWvshEU+42gNzTKgh5RnJsB5XfukVbVqRGMI5EsCAAAAAADQBwAAAAAAAJYAAAAAAAAArq4hZAAAAAAC",
//     [user1Pk])




// checkUserRegistered(new HexString("0xd4817efc9a211d9a9c411fd110ec66a6fdc57f5f4a5d3f91e5988b7716627380"), "0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::dogecoinV2::DogeCoin")
// rawTransactionCoinTransfer()


// ==> 1st step

// registerTokenToAddress(rpc, user1, feePayer)


// ==> 2nd to fetch sign from payer 
// Getting error here 
// getTransactionAuthenticationFromSigners()

// getTransactionAuthenticationFromSigners2()

createMultiAgentTXAndSubmit()

// 0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::dogecoinV2::DogeCoin


// fetchbal("0xe08234e97db755974ab88749e0c64c367208c39bf114769370a0b8aa85e8d850")

// fetchCoinBal("0xe08234e97db755974ab88749e0c64c367208c39bf114769370a0b8aa85e8d850", "0x334dbaf0e815bd106a61c7031a0043770ed3e0c46ea5b0cf9cb7855a57adaeba::dogecoinV2")

// fetchTx("0x6d49ffaa3a3782ec5ca091ce99445434d9aee913474be6929039b9626f9f3a2b")

// fetchGasUnitPrice()


// getTransactionsForAddress("0x6aa517c9cac5e1d1131e1c3fc35267c5e7914412a5c4366a3d4c3ef945ed326c")

// signAndSendSerializedTxn(
//     "4II06X23VZdKuIdJ4MZMNnIIw5vxFHaTcKC4qoXo2FAuAAAAAAAAAAIzTbrw6BW9EGphxwMaAEN3DtPgxG6lsM+ct4VaV62uugpkb2dlY29pblYyCHJlZ2lzdGVyAADQBwAAAAAAAJYAAAAAAAAAJlcQZAAAAAAC",
//     ["0cf1d65c98982e9bab2eabe4eccf83375a331e43f87fa78c9a9b4f0a0bc75326"])

// rawtxWithPyerr()
// sentAptosBetweenUserEncodedTransaction()
// rawtxWithPyerr()
// newKeyPair()

// registerTokenToAddress()
// getAccountResources("0xb93b7263d7632613688f22d8c09a285d81ef727bf283c6b761efd982c400e5be")

// feePayerTransfer().then((r) => { console.log("success") });
// fetchbal("0x59e87e6a53451220a5f1546a929e9020b1c757e8a9b6ec3a76637de005f9b371");