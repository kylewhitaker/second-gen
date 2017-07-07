class LineItem {

  constructor(productName, quantity) {
    this.productName = productName;
    this.quantity = quantity;
  }

  toString() {
    return `Product: ${this.productName} Quantity: ${this.quantity}`;
  }

}

module.exports = LineItem;
