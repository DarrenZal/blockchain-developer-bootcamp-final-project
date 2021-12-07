import React, { Component, useCallback, useEffect, useState } from "react";
import CICfactory from "./contracts/CICfactory.json";
import getWeb3 from "./getWeb3";
import ReactDOM from 'react-dom';

import "./App.css";

var mintCIC = function(arg) {
  return function() { App.mintTheCIC(arg); };
}; 

class App extends Component {
  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {CIC_name: "", CIC_symbol: "", storageValue: "", web3: null, accounts: null, contract: null};
    this.state.filterText = "";
    this.state.products = [
      {
        id: 1,
        Address: '',
        CommittedGoodsandServices: '',
        GoodsAmount: '',
        GoodsValue: '',
        Phone: '',
        name: ''
      }
    ];

    this.handleCIC_name_Change = this.handleCIC_name_Change.bind(this);
    this.handleCIC_symbol_Change = this.handleCIC_symbol_Change.bind(this);
  }
  handleCIC_name_Change(event) {
    this.setState({ CIC_name: event.target.value});
  }
  handleCIC_symbol_Change(event) {
    this.setState({ CIC_symbol: event.target.value});
  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      Address: "",
      name: "",
      phone: "",
      GoodsValue: "",
      GoodsAmount: "",
      CommittedGoodsandServices: ""
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
  var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CICfactory.networks[networkId];
      const instance = new web3.eth.Contract(
        CICfactory.abi,
        "0x2664206dae741fFF6Bc812d71B1676285588BCdC",
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
   
    // Stores a given value, 5 by default.
    await contract.methods.Create_CIC_Contract("Vancouver Island Currency","VIC",["0x91bD6239B3CAA9D6624FdCbD91C6C5EEceae720d"],[1],["Mushrooms"],[100],[1000]).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.CIC_list(0).call();
    // Update state with the result.
    this.setState({ storageValue: response });
  };

  createCIC = async values => {
    var All_Addresses = [];
    var All_Signed = [];
    var All_Goods = [];
    var All_Amounts = [];
    var All_Values = [];
    var product = this.state.products.map(function(product) {
      All_Addresses.push(product.Address);
      All_Signed.push(1);
      All_Goods.push(product.CommittedGoodsandServices)
      All_Amounts.push(product.GoodsAmount);
      All_Values.push(product.GoodsValue);
      });

    const { accounts, contract, web3 } = this.state;
    const contractHash = web3.utils.sha3(`<h1>Create a Community Inclusion Currency!</h2>
    <p style="font-size: 1.6em;">Preamble</p>
    <p style="font-size: 1.2em;"><B>Sarafu Unlimited</B> is an open association of people and organizations with the aim of issuing, assigning and redeeming (“Clearing”) in exchange for goods and services, Sarafu provided by Members.</p>
    
    <p style="font-size: 1.2em;"><B>Sarafu Network</B> is a digital platform that enables members of Sarafu Unlimited to view, and assignment
    of their Sarafu and is maintained by a Service Provider assigned in this application.</p>`, All_Addresses, All_Goods, All_Amounts, All_Values);

    // Stores a given value, 5 by default.
    await contract.methods.Create_CIC_Contract(this.state.CIC_name,this.state.CIC_symbol,All_Addresses,All_Signed,All_Goods,All_Amounts,All_Values, contractHash).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.CIC_list(0).call();
    // Update state with the result.
    this.setState({ storageValue: response });
  };
  async MinttheCIC(response) {
    //const { accounts, contract, web3 } = this.state;
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.mintCIC(CIC_name).call();
    // Update state with the result.
    //alert(response);
  };
  AddCreatedCICTable = async values => {
    const { accounts, contract, web3 } = this.state;
    const num_CICs = await contract.methods.GetCount().call();
    var tableBody = document.getElementById("CreatedCICsBody");
    var new_tbody = document.createElement('tbody');
    new_tbody.id = "CreatedCICsBody";
    for (var k = 0; k < num_CICs; k++) { 
    const response = await contract.methods.CIC_list(k).call();
    const contractSymbol = await contract.methods.getContractSymbol(response).call();
    const contractAddress = await contract.methods.getContractAddress(response).call();
    const contractBackers = await contract.methods.getContractBackers(response).call();
    const contractSigned = await contract.methods.getContractSignatures(response).call();
    const contractGoods = await contract.methods.getContractGoods(response).call();
    const contractAmounts = await contract.methods.getContractAmounts(response).call();
    const contractValues = await contract.methods.getContractValues(response).call();
    const contractHash = await contract.methods.getContractHash(response).call();
    var row = new_tbody.insertRow(-1);
      row.id = 'header' + k;
      row.class = "white";
      var cell1 = row.insertCell();
      cell1.innerHTML = "CIC Name: " + response + "&nbsp; &nbsp; &nbsp; &nbsp" +  "CIC Symbol: " + contractSymbol;
      cell1.style.textAlign = "center";
      cell1.style.fontWeight = "bold";
      cell1.colSpan = "9";
      var row2 = new_tbody.insertRow(-1);
      row2.id = 'Address' + k;
      row2.class = "white";
      var cell2 = row2.insertCell();
      if(contractAddress == '0x0000000000000000000000000000000000000000'){
        var btn = document.createElement('input');
         btn.type = "button";
         btn.className = "tableBtn";
         btn.value = "Mint";
         btn.onclick = (function(response){ return async function(){ 
           const num_CICs = await contract.methods.GetCount().call();
           const CIC_address = await contract.methods.mintCIC(response).send({ from: accounts[0] });
         }}
         
         )(response);
         cell2.appendChild(btn);
         cell2.style.textAlign = "center";
         cell2.style.width = "15%";
      } else {
        cell2.innerHTML = "CIC Address: " + contractAddress;
        cell2.style.textAlign = "center";
        cell2.style.fontWeight = "bold";
        cell2.colSpan = "9";
      }
      var row1 = new_tbody.insertRow(-1);
      row1.id = 'transRow' + i;
      row1.class = "white";
      var cell4 = row1.insertCell();
      cell4.innerHTML = "Backer";
      cell4.style.textAlign = "left";
      var cell5 = row1.insertCell();
      cell5.innerHTML = "Signed";
      cell5.style.textAlign = "left";
      var cell6 = row1.insertCell();
      cell6.innerHTML = "Committed Goods and Services";
      cell6.style.textAlign = "left";
      var cell7 = row1.insertCell();
      cell7.innerHTML = "Amount";
      cell7.style.textAlign = "left";
      var cell8 = row1.insertCell();
      cell8.innerHTML = "Value";
      cell8.style.textAlign = "left";
      var cell9 = row1.insertCell();
      cell9.innerHTML = "Hash";
      cell9.style.textAlign = "left";
    for (var i = 0; i < contractBackers.length; i++) {
      var row = new_tbody.insertRow(-1);
      row.id = 'transRow' + i;
      row.class = "white";
      var cell4 = row.insertCell();
      cell4.innerHTML = contractBackers[i];
      cell4.style.textAlign = "left";
      cell4.style.width = "10%";
      var cell5 = row.insertCell();
      cell5.innerHTML = contractSigned[i];
      cell5.style.textAlign = "left";
      cell5.style.width = "2%";
      var cell6 = row.insertCell();
      cell6.innerHTML = contractGoods[i];
      cell6.style.textAlign = "left";
      cell6.style.width = "10%";
      var cell7 = row.insertCell();
      cell7.innerHTML = contractAmounts[i];
      cell7.style.textAlign = "left";
      cell7.style.width = "10%";
      var cell8 = row.insertCell();
      cell8.innerHTML = contractValues[i];
      cell8.style.textAlign = "left";
      cell8.style.width = "10%";
      var cell9 = row.insertCell();
      cell9.innerHTML = contractHash;
      cell9.style.textAlign = "left";
      cell9.style.width = "10%";
    }
    }
    tableBody.parentNode.replaceChild(new_tbody, tableBody);
  }

  
  
  render() {
    const myHTML = `<h1>Create a Community Inclusion Currency!</h2>
  <p style="font-size: 1.6em;">Preamble</p>
  <p style="font-size: 1.2em;"><B>Sarafu Unlimited</B> is an open association of people and organizations with the aim of issuing, assigning and redeeming (“Clearing”) in exchange for goods and services, Sarafu provided by Members.</p>
  
  <p style="font-size: 1.2em;"><B>Sarafu Network</B> is a digital platform that enables members of Sarafu Unlimited to view, and assignment
  of their Sarafu and is maintained by a Service Provider assigned in this application.</p>`;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div dangerouslySetInnerHTML={{ __html: myHTML }} />
        <div>Currency Name:  <input type="text" value={this.state.CIC_name} onChange={this.handleCIC_name_Change} /></div>
        <div>Currency Symbol:  <input type="text" value={this.state.CIC_symbol} onChange={this.handleCIC_symbol_Change} /></div>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        <button type="button" onClick={this.createCIC} className="btn btn-success pull-right">Submit</button>
        <br/>
        <button type="button" onClick={this.AddCreatedCICTable} className="btn btn-success pull-right">Show Created CICs</button>
        <br/>
        <table id="CreatedCICs" className="table table-bordered">
          <thead>
            <th></th>
            
          </thead>

          <tbody id="CreatedCICsBody">
   

          </tbody>

        </table>

        
      </div>
    );
  }
}

class ProductTable extends React.Component {
    
  render() {

      
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
      
      <div>
        
        <table id="productTable" className="table table-bordered">
          <thead>
            <tr>
              <th>Address</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Committed Goods and Services</th>
              <th>Amount</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "Address",
          value: this.props.product.Address,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "phone",
          value: this.props.product.phone,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "CommittedGoodsandServices",
          value: this.props.product.CommittedGoodsandServices,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "GoodsAmount",
          value: this.props.product.GoodsAmount,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "GoodsValue",
          value: this.props.product.GoodsValue,
          id: this.props.product.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}

export default App;
