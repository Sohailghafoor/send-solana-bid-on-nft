async function main() {
  require("dotenv").config();
  const { API_URL, PRIVATE_KEY } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_URL);
  const myAddress = "0x7a0B7dc32E19383A8c6043EB2F2e4F1B0D28eF28"; //TODO: replace this address with your own public address

  const nonce = await web3.eth.getTransactionCount(myAddress, "latest"); // nonce starts counting from 0

  const transaction = {
    to: "0x6866543624A657Bc48322716b41033f6b37B9447", // faucet address to return eth
    value: 100000000000000000, // 0.01 ETH
    gas: 21000,
    nonce: nonce,
    // optional data field to send message or execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log(
          "🎉 The hash of your transaction is: ",
          hash,
          "\n Check Alchemy's Mempool to view the status of your transaction!"
        );
      } else {
        console.log(
          "❗Something went wrong while submitting your transaction:\n",
          error
        );
      }
    }
  );
}

main();
