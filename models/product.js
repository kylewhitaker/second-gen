class Product {

  constructor(name, unitPrice) {
    this.name = name;
    this.unitPrice = unitPrice;
  }

  toString() {
    return `PRODUCT ${this.name} ${this.unitPrice}`;
  }

}

module.exports = Product;
