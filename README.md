# blockchain-developer-bootcamp-final-project

Project overview:<br />
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
Directory Structure:<br />
This project was bootstrapped with a React-app.<br />
 
	The public folder has React HTML.<br />
 
	The App folder has the Javascipt and CSS, and a contracts folder with smart contract JSON files.<br />
  
  &nbsp;&nbsp;The App folder has App.js, which is where most of the code was written for this project.<br />
The Client folder has the front end components (HTM, CSS, JS).<br />
The Contracts folder has the smart contracts.<br />
The migrations folder has config for truffle migrations.<br />
<br />
<br />
Front End:<br />
Demo is deployed on Ropsten testnet and is hosted at:<br />
https://communityinclusioncurrencies.firebaseapp.com/<br />
<br />
Dependencies and installation (mac):<br />
npm<br />
&nbsp;brew install node<br />
truffle (for building, testing, and depoying contracts)<br />
&nbsp;npm install -g truffle<br />
ganache (for testing smart contracts with a local node)<br />
&nbsp;https://github.com/trufflesuite/ganache-ui/releases<br />
react (used for bootstrapping front-end)<br />
&nbsp;npm install -g create-react-app<br />
<br />
<br />
Accessing or—if your project needs a server (not required)—running your project<br />
Running your smart contract unit tests and which port a local testnet should be running on.<br />
Note: This section used to require three bash scripts but has been revised.<br />
<br />
My public Ethereum account: 0x3E7F054563682c42bd4907b88D0DC27557992576
