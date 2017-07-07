class ProductOrderSummary {

  constructor(product, quantity) {
    this.productName = product.name;
    this.quantity = Number(quantity);
    this.cost = this.setCost(product.unitPrice);
  }

  setCost(unitPrice) {
    return (this.quantity * unitPrice).toFixed(2);
  }

  toString() {
    return `${this.productName}: ${this.quantity} sold for $${this.cost}`;
  }
}

module.exports = ProductOrderSummary;
