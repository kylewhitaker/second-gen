class LineItem {

  constructor(productName, quantity) {
    this.productName = productName;
    this.quantity = quantity;
  }

  getProductName() {
    return this.productName;
  }

  getQuantity() {
    return Number(this.quantity);
  }

}

module.exports = LineItem;
