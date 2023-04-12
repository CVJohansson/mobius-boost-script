import { AptosClient, AptosAccount } from "aptos";

//Enter your mnemonic phrase here.
let MnemonicPhrase = "";
// deposit token : Find the NFT collection that you own, corresponding to this pool.
let token = {
  creator: "0x722ca8116cbac6aa289a9c1c597db0aeb8978936348771c2a416a65e139db1fa",
  collection: "Souffl3 BakeOff - Egg",
  name: "Egg #2744",
  versions: 0,
};

// Choose a pool ID that matches the collection of tokens you own.
let target_pool_index = 97;

let client = new AptosClient("https://fullnode.mainnet.aptoslabs.com");
let account = AptosAccount.fromDerivePath(
  "m/44'/637'/0'/0'/0'",
  MnemonicPhrase
);
let MOBIUS_CONTRACT =
  "0xd44ae23723aacdc658f1edd74a4b97016201a4a5f0fbbfdb31cfab673ab2d899";

// You must own 11 or more APT in order to invoke this feature.
(async () => {
  // set edit pool : check your price
  await EditPool({
    account,
    target_pool_index,
    curve: 1,
    spot_price: 10 * 10000 * 10000,
    delta: 10000,
    fee: 0,
  });

  await DepositToken({
    account,
    target_pool_index,
    creators: [token.creator],
    collection_names: [token.collection],
    token_names: [token.name],
    property_versions: [token.versions],
  });

  // // deposit coin : your  apt
  // let amount = 0;
  // await DepositCoin({
  //     account,
  //     target_pool_index,
  //     amount
  // })

  await SwapCoinForSpecificNFTs({
    account,
    target_pool_index,
    creators: [token.creator],
    collection_names: [token.collection],
    token_names: [token.name],
    property_versions: [token.versions],
  });

  await SwapNFTsForCoin({
    account,
    target_pool_index,
    creators: [token.creator],
    collection_names: [token.collection],
    token_names: [token.name],
    property_versions: [token.versions],
  });

  await WithdrawToken({
    account,
    target_pool_index,
    creators: [token.creator],
    collection_names: [token.collection],
    token_names: [token.name],
    property_versions: [token.versions],
  });

  // stop
  await EditPool({
    account,
    target_pool_index,
    curve: 1,
    spot_price: 10 * 10000 * 10000,
    delta: 10000,
    fee: 99000,
  });
})();

async function CreatePool(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::Create`,
    type_arguments: [],
    arguments: [
      args.curve,
      args.creators,
      args.collection_names,
      args.token_names,
      args.property_versions,
      args.property_versions,
      args.deposit_coin_amount,
      args.spot_price,
      args.delta,
      args.fee,
      args.type,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log(transactionRes.hash);
}

async function EditPool(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::EditPool`,
    type_arguments: [],
    arguments: [
      args.target_pool_index,
      args.curve,
      args.spot_price,
      args.delta,
      args.fee,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("EditPool", transactionRes.hash);
}

async function DepositToken(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::DepositToken`,
    type_arguments: [],
    arguments: [
      args.target_pool_index,
      args.creators,
      args.collection_names,
      args.token_names,
      args.property_versions,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("DepositToken", transactionRes.hash);
}

async function DepositCoin(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::DepositCoin`,
    type_arguments: [],
    arguments: [args.target_pool_index, args.amount],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("DepositCoin", transactionRes.hash);
}

async function SwapNFTsForCoin(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::SwapNFTsForCoin`,
    type_arguments: [],
    arguments: [
      args.target_pool_index,
      args.creators,
      args.collection_names,
      args.token_names,
      args.property_versions,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("SwapNFTsForCoin", transactionRes.hash);
}

async function SwapCoinForSpecificNFTs(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::SwapCoinForSpecificNFTs`,
    type_arguments: [],
    arguments: [
      args.target_pool_index,
      args.creators,
      args.collection_names,
      args.token_names,
      args.property_versions,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("SwapCoinForSpecificNFTs", transactionRes.hash);
}

async function WithdrawToken(args) {
  let payload = {
    function: `${MOBIUS_CONTRACT}::Script::WithdrawToken`,
    type_arguments: [],
    arguments: [
      args.target_pool_index,
      args.creators,
      args.collection_names,
      args.token_names,
      args.property_versions,
    ],
  };
  const txnRequest = await client.generateTransaction(
    args.account.address(),
    payload
  );
  const signedTxn = await client.signTransaction(args.account, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash, { checkSuccess: true });
  console.log("WithdrawToken", transactionRes.hash);
}
