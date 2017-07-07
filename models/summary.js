var ProductTotals = require('./product-totals');

class Summary {

  constructor(products, orders) {
    this.products = products;
    this.orders = orders;
    this.outputLines = this.setOutputLines();
    this.output = this.setOutput();
  }

  setOutputLines() {
    var outputLines = [];
    this.products.forEach(product => {
      var count = 0;
      this.orders.forEach(order => {
        order.getLineItems().forEach(lineItem => {
          if (product.name == lineItem.getProductName()) {
            count += lineItem.getQuantity();
          }
        });
      });
      outputLines.push(new ProductTotals(product.name, count, count * product.unitPrice));
    });

    return outputLines;
  }

  setOutput() {
    var output = null;
    this.outputLines.forEach(line => {
      output = !output ? line.toString() : output.concat('\n', line.toString());
    });
    return output;
  }

  getOutput() {
    return this.output;
  }

}

module.exports = Summary;
