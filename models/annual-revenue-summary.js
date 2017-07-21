var Order = require('./order');
var Product = require('./product');

class AnnualRevenueSummary {

  constructor(year, order, products) {
    this.year = year;
    this.revenue = '0.00'
    this.addRevenue(order, products);
  }

  addRevenue(order, products) {
    var revenue = 0;
    order.lineItems.forEach(lineItem => {
      var product = products.find(product => {
        return product.name == lineItem.productName;
      });
      revenue += Number((lineItem.quantity * product.unitPrice));
    });
    revenue += Number(this.revenue);
    this.revenue = revenue.toFixed(2);
  }

  toString() {
    return `${this.year}: $${this.revenue}`;
  }

}

module.exports = AnnualRevenueSummary;
