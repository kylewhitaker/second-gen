var Product = require('./product');
var Order = require('./order');

class CustomerOrderHistory {

  constructor(input) {
    this.input = input;
    this.products = [];
    this.orders = [];
    this.summary = null;
  }

  getInput() {
    return this.input;
  }

  getSummary() {
    if (!this.summary) {
      this.createSummary();
    }
    return this.summary;
  }

  createSummary() {
    this.input.split('\n').forEach(line => {
      if (line.startsWith('PRODUCT')) {
        this.addProduct(line);
      }
      else if (line.startsWith('ORDER')) {
        this.addOrder(line);
      }
    });
  }

  addProduct(line) {
    var details = line.split(' ');
    var name = details[1];
    var unitPrice = details[2];
    this.products.push(new Product(name, unitPrice));
  }

  addOrder(line) {
    var details = line.split(' ');
    var date = details[1];
    var productsAndQuantities = details.slice(2);
    this.products.push(new Order(date, productsAndQuantities));
  }

}

module.exports = CustomerOrderHistory;
