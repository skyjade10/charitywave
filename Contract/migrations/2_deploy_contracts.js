var Voyte = artifacts.require("./Voyte.sol");
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Voyte);
};
