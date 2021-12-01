# blockchain-developer-bootcamp-final-project

<b>Project overview:</b><br />
This project allows anyone to create a Community Inclusion Currency (CIC).<br />
At Grassroots Economics, we hep communities build their own currencies.<br />
These currencies are backed by goods and services of the community.<br />
Individuals within the community can mint some of their currency in exchange for a promise to redeem that amount of currency for their goods and services.<br />
This project allows individuals to add these pledges to a community currency, specifying what goods and services they are pledging, the amount, value, etc.<br />
The front end has a table where these details are filled out.<br />
A submit button allows the CIC data to be stored in the smart contract, but the CIC has not been minted yet.<br />
When all backers have signed off on their pledges, the CIC can be minted.<br />
Minting distributes CIC to all the backers in proportion to the value of goods and services they pledged.<br />
The CICs are ERC20s.<br />
<br />
<br />
<b>Directory Structure:</b><br />
This project was bootstrapped with a React-app.<br />
 
	The public folder has React HTML.<br />
 
	The App folder has the Javascipt and CSS, and a contracts folder with smart contract JSON files.<br />
  
  &nbsp;&nbsp;The App folder has App.js, which is where most of the code was written for this project.<br />
The Client folder has the front end components (HTM, CSS, JS).<br />
The Contracts folder has the smart contracts.<br />
The migrations folder has config for truffle migrations.<br />
<br />
<br />
<b>Front End:</b><br />
Demo is deployed on Ropsten testnet and is hosted at:<br />
https://communityinclusioncurrencies.firebaseapp.com/<br />
Video of me walking through the app: https://drive.google.com/file/d/19Y8Y_QKNURlGiTTPv1LmVL-ZIQs_6kw7/view?usp=sharing<br />
<br />
<b>Dependencies and installation (mac):</b><br />
<b>npm</b><br />
&nbsp;brew install node<br />
<b>truffle (for building, testing, and depoying contracts)</b><br />
&nbsp;npm install -g truffle<br />
<b>ganache (for testing smart contracts with a local node)</b><br />
&nbsp;https://github.com/trufflesuite/ganache-ui/releases<br />
<b>react (used for bootstrapping front-end)</b><br />
&nbsp;npm install -g create-react-app<br />
<b>Metamask (a web wallet for interacting with Ethereum blockchain)</b><br />
&nbsp;https://metamask.io/<br />
&nbsp;Ropsten testnet Ether can be found for free at a faucet: https://faucet.ropsten.be/<br />
<br />
<b>Testing</b><br />
Solidity and Javascript tests are in the test folder.  to run the tests simply run:<br />
```
truffle test<br />
```
<br />
<br />
My public Ethereum account: 0x3E7F054563682c42bd4907b88D0DC27557992576
