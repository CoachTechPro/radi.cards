const RadiCards = artifacts.require("./RadiCards.sol");

const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraApikey = "9542ce9f96be4ae08225dcde36ff1638";

module.exports = async (deployer, network, accounts) => {
  let account = accounts[0];

  // Load in other accounts for different networks
  if (
    network === "ropsten" ||
    network === "ropsten-fork" ||
    network === "rinkeby" ||
    network === "rinkeby-fork" ||
    network === "kovan" ||
    network === "kovan-fork"
  ) {
    account = new HDWalletProvider(
      require("../mnemonic"),
      `https://${network}.infura.io/v3/${infuraApikey}`,
      0
    ).getAddress();
  }

  if (network === "live" || network === "live-fork") {
    account = new HDWalletProvider(
      require("../mnemonic_live"),
      `https://mainnet.infura.io/v3/${infuraApikey}`,
      0
    ).getAddress();
  }

  console.log(`Running within network = ${network}`);
  console.log(`Account = ${account}`);

  const contract = await RadiCards.deployed();
  await contract.addCard(
    11,
    "QmSoUaxVvT6AEdhnVyVxxPvFNW9EqNZbn3Us397pBb8z8v",
    true,
    { from: account }
  ); // aktiv
  await contract.addCard(
    12,
    "QmTNjtQNEwximQy4Gz8unvyuP54sd9ZEk7KzUWJWStgSea",
    true,
    { from: account }
  ); // lilli
};
