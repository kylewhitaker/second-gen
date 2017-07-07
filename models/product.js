class Product {

  constructor(name, unitPrice) {
    this.name = name;
    this.unitPrice = Number(unitPrice).toFixed(2);
  }

}

module.exports = Product;
