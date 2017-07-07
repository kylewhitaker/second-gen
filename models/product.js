class Product {

  constructor(name, unitPrice) {
    this.name = name;
    this.unitPrice = unitPrice;
  }

  getName() {
    return this.name;
  }

  getUnitPrice() {
    return this.unitPrice;
  }

}

module.exports = Product;
