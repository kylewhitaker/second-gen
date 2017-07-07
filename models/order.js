class Order {

  constructor(date, items) {
    this.date = date;
    this.items = items;
  }

  toString() {
    return `ORDER ${this.date} ${this.items}`;
  }

}

module.exports = Order;
