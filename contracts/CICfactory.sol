// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ERC20PresetMinterPauser.sol";

/// @title An ERC20PresetMinterPauser factory for minting Community Inclusion Currencies (CICs)
/// @author Darren Zal
/// @notice You can use this contract for most basic testing
/// @dev All function calls are currently implemented without side effects
contract CICfactory {

   string[] public CIC_list;
   struct Contract { 
     string name;
     string symbol;
     address erc20Address;
     address[] backers;
     bool[] signed;
     string[] goods;
     uint[] amounts;
     uint256[] values;
     uint256[] minted;
     string hash;
   }
   mapping(string => Contract) CIC_contracts;
   
   /// @notice gets number of CICs created
   /// @return count of CICs created
   function GetCount() public view returns(uint count) {
    return CIC_list.length;
   }

   /// @notice getter for CIC symbol
   /// @return symbol of CIC contract
   function getContractSymbol(string calldata cic) public view returns ( 
     string memory symbol){
         return (CIC_contracts[cic].symbol);
     }
     /// @notice getter for CIC address
     /// @return erc20Address of CIC contract
     function getContractAddress(string calldata cic) public view returns ( 
     address erc20Address){
         return (CIC_contracts[cic].erc20Address);
     }
     /// @notice getter for CIC backers
     /// @return backers of CIC contract
     function getContractBackers(string calldata cic) public view returns ( 
     address[] memory backers){
         return (CIC_contracts[cic].backers);
     }
     /// @notice getter for CIC signatures
     /// @return signed of yes/no for CIC contract
     function getContractSignatures(string calldata cic) public view returns ( 
     bool[] memory signed){
         return (CIC_contracts[cic].signed);
     }
     /// @notice getter for CIC goods
     /// @return goods of CIC contract
     function getContractGoods(string calldata cic) public view returns ( 
     string[] memory goods){
         return (CIC_contracts[cic].goods);
     }
     /// @notice getter for CIC amounts
     /// @return amounts of CIC contract
     function getContractAmounts(string calldata cic) public view returns ( 
     uint[] memory amounts){
         return (CIC_contracts[cic].amounts);
     }
     /// @notice getter for CIC values
     /// @return values of CIC contract
     function getContractValues(string calldata cic) public view returns ( 
     uint256[] memory values){
         return (CIC_contracts[cic].values);
     }
     /// @notice getter for CIC backers
     /// @return minted amounts of CIC for given CIC, for list of backers
     function getContractMinted(string calldata cic) public view returns ( 
     uint256[] memory minted){
         return (CIC_contracts[cic].minted);
     }
     /// @notice getter for CIC hash
     /// @return hash of CIC contract
     function getContractHash(string calldata cic) public view returns ( 
     string memory hash){
         return (CIC_contracts[cic].hash);
     }

    /// @notice Stores CIC info in this contract, does not mint the ERC20 
    /// @dev parameters can be filled out in table in front end
    /// @param _name name of CIC
    /// @param symbol symbol of CIC
    /// @param backers addresses of businesses backing the CIC with goods and services
    /// @param signed did the backer sign the contract?
    /// @param goods description of goods and services backing the CIC
    /// @param amounts amount of goods and services backing CIC
    /// @param values value of goods and services backing CIC (ex denominated in USD)
    /// @param _hash hash of prose contract including above parameters
    /// @return true if successfully added
    function Create_CIC_Contract(
        string calldata _name,
        string calldata symbol,
        address[] memory backers,
        bool[] memory signed,
        string[] memory goods,
        uint[] memory amounts, 
        uint256[] memory values,
        string calldata _hash
    ) external returns (bool) {

        //require name is not already 
        require (keccak256(abi.encodePacked(CIC_contracts[_name].name)) == keccak256(abi.encodePacked("")));
        uint256[] memory minted = new uint256[](backers.length);
        //bool[] memory signed;

        CIC_contracts[_name] = Contract(_name, symbol, address(0), backers, signed, goods, amounts, values, minted, _hash);

        CIC_list.push(_name);
        return true;
    }
    
    /// @notice Allows backer to signs the CIC contract, signing off that their backing is correct if filled in by someone else 
    /// @dev signatures could be collected offchain batched in as well
    /// @param cic name of CIC
    /// @param backer_num which backer is signing
    /// @return bool of true if successfully added
    function signCIC(
        string calldata cic,
        uint backer_num
    ) external returns (bool) {
        require(CIC_contracts[cic].backers[backer_num] == msg.sender);
        CIC_contracts[cic].signed[backer_num] = true;

        return true;
    }
    
    /// @notice Creates the ERC20 for the CIC, anyone can call because it checks if backers have signed contract
    /// @dev signatures could be collected offchain batched in as well
    /// @param cic_name name of CIC
    /// @return newCIC address
    function mintCIC(
        string calldata cic_name    
    ) external returns (address newCIC) {
        for (uint i=0; i< CIC_contracts[cic_name].backers.length; i++){
            require(CIC_contracts[cic_name].signed[i] == true);
        }
        ERC20PresetMinterPauser token = new ERC20PresetMinterPauser(
            CIC_contracts[cic_name].name,
            CIC_contracts[cic_name].symbol
        );
        for (uint i=0; i< CIC_contracts[cic_name].values.length; i++){
            token.mint(CIC_contracts[cic_name].backers[i], CIC_contracts[cic_name].values[i]);
            CIC_contracts[cic_name].minted[i] += CIC_contracts[cic_name].values[i];
        }
        
        CIC_contracts[cic_name].erc20Address = address(token);
        return address(token);
    }
}