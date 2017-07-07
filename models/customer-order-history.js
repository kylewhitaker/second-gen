var Product = require('./product');
var Order = require('./order');
var ProductOrderSummary = require('./product-order-summary');

class CustomerOrderHistory {

  constructor(input) {
    this.input = input;
    this.products = this.mapProducts();
    this.orders = this.mapOrders();
    this.productOrderSummaries = this.mapProductOrderSummaries();
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

  mapProductOrderSummaries() {
    var productOrderSummaries = [];
    this.products.forEach(product => {
      var quantity = 0;
      this.orders.forEach(order => {
        order.lineItems.forEach(lineItem => {
          if (lineItem.productName == product.name) {
            quantity += Number(lineItem.quantity);
          }
        });
      });
      productOrderSummaries.push(new ProductOrderSummary(product, quantity));
    });
    return productOrderSummaries;
  }

  getSummary() {
    var summary = null;
    this.productOrderSummaries.forEach(pos => {
      summary = summary ? summary.concat('\n', pos.toString()) : pos.toString();
    });
    return summary;
  }

}

module.exports = CustomerOrderHistory;
