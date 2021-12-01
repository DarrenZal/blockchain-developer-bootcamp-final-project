# blockchain-developer-bootcamp-final-project

Project overview:
This project allows anyone to create a Community Inclusion Currency (CIC).
At Grassroots Economics, we hep communities build their own currencies.
These currencies are backed by goods and services of the community.
Individuals within the community can mint some of their currency in exchange for a promise to redeem that amount of currency for their goods and services.
This project allows individuals to add these pledges to a community currency, specifying what goods and services they are pledging, the amount, value, etc.
The front end has a table where these details are filled out.
A submit button allows the CIC data to be stored in the smart contract, but the CIC has not been minted yet.
When all backers have signed off on their pledges, the CIC can be minted.
Minting distributes CIC to all the backers in proportion to the value of goods and services they pledged.
The CICs are ERC20s.

Directory Structure:
This project was bootstrapped with a React-app.
 The public folder has React HTML.
 The App folder has the Javascipt and CSS, and a contracts folder with smart contract JSON files.
  The App folder has App.js, which is where most of the code was written for this project.
The Client folder has the front end components (HTM, CSS, JS).
The Contracts folder has the smart contracts.
The migrations folder has config for truffle migrations.


Front End:
Demo is deployed on Ropsten testnet and is hosted at:
https://communityinclusioncurrencies.firebaseapp.com/


