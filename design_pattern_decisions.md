Design patterns used in this project:<br/>
<br/>
Inter-Contract Execution<br/>
  The CICfactory.sol contract creates a new ERC20PresetMinterPauser.sol instance and calls it's mint() function to mint ERC20 tokens to backers of the currency.<br/>
  <br/>
 Inheritance and Interfaces<br/>
  ERC20PresetMinterPauser.sol is a modified ERC20, so it inherits from ERC20.sol and ERC20Burnable.sol.  It also inherits from Context.sol and AccessControlEnumerable.sol.<br/>
  <br/>
Access Control Design Patterns<br/>
  ERC20PresetMinterPauser.sol uses an Admin role and Minter role.  These are used to limit access to actions like minting the ERC20.  Only the factory contract can mint the token.
  
