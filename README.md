# Mobius Trading Volume Boost Script

This script can help you quickly increase your trading volume, but of course, you need to pay a small gas fee. To use this script, you also need to create a pool and have an NFT corresponding to the type of this pool. You also need your mnemonic phrase. Rest assured that the code does not have any functionality to upload your mnemonic phrase. Have fun!
You also need to have more than 11 APT in your wallet.

>Don't forget to modify everything in start.js to suit your needs.
```js
//Enter your mnemonic phrase here.
let MnemonicPhrase = "";
// deposit token : Find the NFT collection that you own, corresponding to this pool.
let token = {
    creator: "",
    collection:"",
    name:"",
    versions: 0,
}

// Choose a pool ID that matches the collection of tokens you own.
let target_pool_index = 0;
```

## Installation
Before running the script, you need to install the following dependencies:
- Nodejs
- npm


## Clone the repository:
```shell
git clone https://github.com/CVJohansson/mobius-boost-script.git
```

## Install the dependencies:
```shell
cd mobius-boost
npm install
```

## Usage
```shell
npm start
```
