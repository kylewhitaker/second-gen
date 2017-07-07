class Order {

  constructor(date, lineItems) {
    this.date = date;
    this.lineItems = lineItems;
  }

  toString() {
    return `ORDER ${this.date} ${this.lineItems}`;
  }

}

module.exports = Order;
