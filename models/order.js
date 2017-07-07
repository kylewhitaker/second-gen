var LineItem = require('./line-item');

class Order {

  constructor(date, productsAndQuantities) {
    this.date = date;
    this.lineItems = this.setLineItems(productsAndQuantities);
  }

  setLineItems(productsAndQuantities) {
    var lineItems = []
    var count = productsAndQuantities.length / 2;
    for (var i = 0; i < count; i++) {
      var productName = productsAndQuantities[i * 2];
      var quantity = productsAndQuantities[i * 2 + 1];
      lineItems.push(new LineItem(productName, quantity));
    }
    return lineItems;
  }

}

module.exports = Order;
