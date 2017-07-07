class ProductTotals {

  constructor(name, count, cost) {
    this.product = name;
    this.count = count;
    this.cost = cost.toFixed(2);
  }

  toString() {
    return `${this.product}: ${this.count} sold for $${this.cost}`;
  }

}

module.exports = ProductTotals;
