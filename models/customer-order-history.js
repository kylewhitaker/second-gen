var Product = require('./product');
var Order = require('./order');
var Summary = require('./summary');

class CustomerOrderHistory {

  constructor(input) {
    this.input = input;
    this.products = this.mapProducts();
    this.orders = this.mapOrders();
    this.summary = this.createSummary();
  }

  mapProducts() {
    var products = [];
    this.input.split('\n').filter(line => {
      return line.startsWith('PRODUCT');
    }).forEach(line => {
      var details = line.split(' ');
      var name = details[1];
      var unitPrice = details[2];
      products.push(new Product(name, unitPrice));
    });
    return products;
  }

  mapOrders() {
    var orders = [];
    this.input.split('\n').filter(line => {
      return line.startsWith('ORDER');
    }).forEach(line => {
      var details = line.split(' ');
      var date = details[1];
      var productsAndQuantities = details.slice(2);
      orders.push(new Order(date, productsAndQuantities));
    });
    return orders;
  }

  getInput() {
    return this.input;
  }

  getSummary() {
    return this.summary;
  }

  createSummary() {
    var summary = new Summary(this.products, this.orders);
    return summary.getOutput();
  }

}

module.exports = CustomerOrderHistory;
