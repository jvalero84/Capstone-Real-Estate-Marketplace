// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async function(deployer) {
  await deployer.deploy(Verifier);
  //console.log(Verifier.address);
  await deployer.deploy(SolnSquareVerifier, Verifier.address);
  //deployer.deploy(Verifier).then(() => {
  //  deployer.deploy(SolnSquareVerifier, Verifier.address);
  //});
};
