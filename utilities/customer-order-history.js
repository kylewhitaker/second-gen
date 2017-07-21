var Product = require('../models/product');
var Order = require('../models/order');
var ProductOrderSummary = require('../models/product-order-summary');
var AnnualRevenueSummary = require('../models/annual-revenue-summary');

class CustomerOrderHistory {

  // PART 1

  getSummary(input) {
    var products = this.mapProducts(input);
    var orders = this.mapOrders(input);
    var productOrderSummaries = this.mapProductOrderSummaries(products, orders);
    var summary = null;
    productOrderSummaries.forEach(pos => {
      summary = summary ? summary.concat('\n', pos.toString()) : pos.toString();
    });
    return summary;
  }

  mapProducts(input) {
    var products = [];
    input.split('\n').filter(line => {
      return line.startsWith('PRODUCT');
    }).forEach(line => {
      var details = line.split(' ');
      var name = details[1];
      var unitPrice = details[2];
      products.push(new Product(name, unitPrice));
    });
    return products;
  }

  mapOrders(input) {
    var orders = [];
    input.split('\n').filter(line => {
      return line.startsWith('ORDER');
    }).forEach(line => {
      var details = line.split(' ');
      var date = details[1];
      var productsAndQuantities = details.slice(2);
      orders.push(new Order(date, productsAndQuantities));
    });
    return orders;
  }

  mapProductOrderSummaries(products, orders) {
    var productOrderSummaries = [];
    products.forEach(product => {
      var quantity = 0;
      orders.forEach(order => {
        order.lineItems.forEach(lineItem => {
          if (lineItem.productName == product.name
            && !this.orderDateBefore2000(order.date)) {
            quantity += Number(lineItem.quantity);
          }
        });
      });
      productOrderSummaries.push(new ProductOrderSummary(product, quantity));
    });
    return this.mergeSort(productOrderSummaries);
  }

  orderDateBefore2000(date) {
    return date.localeCompare('20000101') < 0;
  }

  mergeSort(pos) {
    if (pos.length <= 1) {
      return pos;
    } else {
      var midpoint = pos.length / 2;
      var a = this.mergeSort(pos.slice(0, midpoint));
      var b = this.mergeSort(pos.slice(midpoint));
      var merged = [];
      while (a.length > 0 && b.length > 0) {
        merged.push(this.compare(a[0], b[0]) ? a.shift() : b.shift());
      }
      return merged.concat(a, b);
    }
  }

  compare(pos1, pos2) {
    return pos1.quantity >= pos2.quantity;
  }

  // PART 2

  getAnnualRevenue(input) {
    var products = this.mapProducts(input);
    var orders = this.mapOrders(input);
    var annualRevenueSummaries = this.mapAnnualOrderSummaries(products, orders);
    var summary = null;
    annualRevenueSummaries.forEach(pos => {
      summary = summary ? summary.concat('\n', pos.toString()) : pos.toString();
    });
    return summary;
  }

  mapAnnualOrderSummaries(products, orders) {
    var annualRevenueSummaries = [];
    orders.forEach(order => {
      if (!this.orderDateBefore2000(order.date)) {
        var year = order.date.substr(0, 4);
        var ars = annualRevenueSummaries.find(ars => { return ars.year == year; });
        if (ars) {
          ars.addRevenue(order, products);
        } else {
          annualRevenueSummaries.push(new AnnualRevenueSummary(year, order, products));
        }
      }
    });
    return annualRevenueSummaries.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      } else if (a.year > b.year) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}

module.exports = CustomerOrderHistory;
