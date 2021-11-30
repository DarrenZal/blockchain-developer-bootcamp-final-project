import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
class Products extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.products = [];
      this.state = {CIC_name: "", CIC_symbol: ""};
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


    
    render() {
  
      return (
        <div>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
  class ProductTable extends React.Component {
    
    render() {

        const createCIC = async values => {
            var totalValue = 0;
            var product = this.props.products.map(function(product) {
                totalValue = totalValue + Number(product.GoodsValue);
              });
              alert(totalValue);
        };
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
          <div>Currency Name:  <input type="text" value={this.CIC_name} onChange={this.handleCIC_name_Change} /></div>
          <div>Currency Symbol:  <input type="text" value={this.CIC_symbol} onChange={this.handleCIC_symbol_Change} /></div>
          
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
          <br/>
          <button type="button" onClick={createCIC} className="btn btn-success pull-right">Read Rows</button>
          
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

 // React.render( < Products / > , document.getElementById('container'));

export default Products;