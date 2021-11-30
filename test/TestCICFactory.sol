pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CICfactory.sol";

contract TestCICFactory {
  function testCanCreateCIC() public {
    CICfactory _CICFactory = CICfactory(DeployedAddresses.CICfactory());
    string memory  name = "test";
     string memory symbol = "tst";
     address[] memory backers = new address[](1);
      backers[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
     bool[] memory signed = new bool[](1);
     signed[0] = bool(true);
     string[] memory goods = new string[](1);
     goods[0] = "food";
     uint[] memory amounts = new uint[](1);
     amounts[0] = 100;
     uint256[] memory values = new uint256[](1);
     values[0] = 100;
     string memory Constracthash = "0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430";
    bool created = _CICFactory.Create_CIC_Contract(name,symbol,backers,signed,goods,amounts,values,Constracthash);
    Assert.equal(created, true, "It should be able to create a CIC.");
  }

  function testCanSignCIC() public {
    CICfactory _CICFactory = CICfactory(DeployedAddresses.CICfactory());
    string memory  name = "test2";
     string memory symbol = "tst";
     address[] memory backers = new address[](1);
      backers[0] = address(this);
     bool[] memory signed = new bool[](1);
     signed[0] = bool(true);
     string[] memory goods = new string[](1);
     goods[0] = "food";
     uint[] memory amounts = new uint[](1);
     amounts[0] = 100;
     uint256[] memory values = new uint256[](1);
     values[0] = 100;
     string memory Constracthash = "0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430";
    _CICFactory.Create_CIC_Contract(name,symbol,backers,signed,goods,amounts,values,Constracthash);
    bool signedCIC = _CICFactory.signCIC("test2", 0);
    Assert.equal(signedCIC, true, "It should be able to create a CIC.");
  }


  function testItStoresSymbol() public {
    CICfactory _CICFactory = CICfactory(DeployedAddresses.CICfactory());
    string memory name = "test3";
     string memory symbol = "tst";
     address[] memory backers = new address[](1);
      backers[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
     bool[] memory signed = new bool[](1);
     signed[0] = bool(true);
     string[] memory goods = new string[](1);
     goods[0] = "food";
     uint[] memory amounts = new uint[](1);
     amounts[0] = 100;
     uint256[] memory values = new uint256[](1);
     values[0] = 100;
     string memory Constracthash = "0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430";
    bool created = _CICFactory.Create_CIC_Contract(name,symbol,backers,signed,goods,amounts,values,Constracthash);
    string memory expectedSymbol = "tst";
    Assert.equal(_CICFactory.getContractSymbol("test"), expectedSymbol, "It should store the value tst.");


  }

  function testItStoresBackers() public {
    CICfactory _CICFactory = CICfactory(DeployedAddresses.CICfactory());
    string memory name = "test4";
     string memory symbol = "tst";
     address[] memory backers = new address[](1);
      backers[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
     bool[] memory signed = new bool[](1);
     signed[0] = bool(true);
     string[] memory goods = new string[](1);
     goods[0] = "food";
     uint[] memory amounts = new uint[](1);
     amounts[0] = 100;
     uint256[] memory values = new uint256[](1);
     values[0] = 100;
     string memory Constracthash = "0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430";
    bool created = _CICFactory.Create_CIC_Contract(name,symbol,backers,signed,goods,amounts,values,Constracthash);
    address expectedBacker = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
    address[] memory CICbackers = _CICFactory.getContractBackers("test4");
    Assert.equal(CICbackers[0], expectedBacker, "It should store the value tst.");


  }

  function testItCanMintCIC() public {
    CICfactory _CICFactory = CICfactory(DeployedAddresses.CICfactory());
    string memory name = "test5";
     string memory symbol = "tst";
     address[] memory backers = new address[](1);
      backers[0] = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
     bool[] memory signed = new bool[](1);
     signed[0] = bool(true);
     string[] memory goods = new string[](1);
     goods[0] = "food";
     uint[] memory amounts = new uint[](1);
     amounts[0] = 100;
     uint256[] memory values = new uint256[](1);
     values[0] = 100;
     string memory Constracthash = "0x15963dd53bd4f6e47f7b16e812ea2cd60bac4108b8d4411201e848e9f88df430";
    bool created = _CICFactory.Create_CIC_Contract(name,symbol,backers,signed,goods,amounts,values,Constracthash);
    Assert.isNotZero(_CICFactory.mintCIC("test5"), "Minting CIC should return an address");


  }


}
