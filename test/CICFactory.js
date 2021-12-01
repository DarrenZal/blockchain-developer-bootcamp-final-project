const CICfactory = artifacts.require("./CICfactory.sol");

contract("CICfactory", accounts => {
  //Should store token symbol and return it with getter
  it("...should store token symbol.", async () => {
    const CICfactoryInstance = await CICfactory.deployed();

    // Creat CIC data
    await CICfactoryInstance.Create_CIC_Contract("test","tst",["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],[true],["food"],[1000],[100],"0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430");

    // Get stored value
    const response = await CICfactoryInstance.getContractSymbol("test");

    assert.equal(response, "tst", "The value symbol of tst was not stored.");
  });

  //Should store token backers and return the array with getter
  it("...should store token backers.", async () => {
    const CICfactoryInstance = await CICfactory.deployed();

    await CICfactoryInstance.Create_CIC_Contract("test2","tst",["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],[true],["food"],[1000],[100],"0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430");

    // Get stored value
    const response = await CICfactoryInstance.getContractBackers("test2");

    assert.equal(response[0], "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "The back of 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 was not stored.");
  });

  //Should store signatures of token backers as booleans and return the array with getter
  it("...should store token signatures.", async () => {
    const CICfactoryInstance = await CICfactory.deployed();

    await CICfactoryInstance.Create_CIC_Contract("test3","tst",["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],[true],["food"],[1000],[100],"0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430");

    // Get stored value
    const response = await CICfactoryInstance.getContractSignatures("test2");

    assert.equal(response[0], true, "The signature of test CIC was not stored.");
  });

  //Should store goods that backers promise to redeem the token with and return the array with getter
  it("...should store token goods.", async () => {
    const CICfactoryInstance = await CICfactory.deployed();

    // Set value of 89
    await CICfactoryInstance.Create_CIC_Contract("test4","tst",["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],[true],["food"],[1000],[100],"0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430");

    // Get stored value
    const response = await CICfactoryInstance.getContractGoods("test2");

    assert.equal(response, "food", "The good of food was not stored.");
  });

  //Should store amount of goods that backers promise to redeem the token with and return the array with getter
  it("...should store token amounts.", async () => {
    const CICfactoryInstance = await CICfactory.deployed();

    // Set value of 89
    await CICfactoryInstance.Create_CIC_Contract("test5","tst",["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],[true],["food"],[1000],[100],"0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430");

    // Get stored value
    const response = await CICfactoryInstance.getContractAmounts("test2");

    assert.equal(response, 1000, "the Amount of 1000 was not stored.");
  });
});
