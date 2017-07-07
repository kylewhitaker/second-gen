const fs = require('fs');
const Product = require('./models/product');
const Order = require('./models/order');

var inputFile = process.argv[2];
var fileAsString = fs.readFileSync(inputFile, 'utf8');
var lines = fileAsString.split('\n');

let products = [];
let orders = [];

console.log("--- Lines ---");
lines.forEach((line) => {
  var items = line.split(' ');
  if (line.startsWith('PRODUCT')) {
    products.push(new Product(items[1], items[2]));
  }
  else if (line.startsWith('ORDER')) {
    date = items[1];
    orders.push(new Order(date, items.slice(2).join(' ')));
  }
  console.log(line);
});

console.log("--- Products ---");
products.forEach((product) => {
  console.log(product.toString());
});

console.log("--- Orders ---");
orders.forEach((order) => {
  console.log(order.toString());
});
