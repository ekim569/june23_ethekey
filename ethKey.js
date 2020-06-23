import Web3 from "web3";

const web3 = new Web3();

const privateKey = "0x142914102f1989940f237142af5ae0b23f004b72d14c4197182df840302ea3dc";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);


console.log(account);