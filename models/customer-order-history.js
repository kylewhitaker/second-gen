class CustomerOrderHistory {

  constructor(input) {
    this.input = input;
    this.products = null;
    this.orders = null;
    this.summary = null;
  }

  getInput() {
    return this.input;
  }

  getSummary() {
    if (!this.summary) {
      this.createSummary();
    }
    return this.summary;
  }

  createSummary() {

  }

}

module.exports = CustomerOrderHistory;
