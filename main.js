var fs = require('fs');
var CustomerOrderHistory = require('./utilities/customer-order-history');

// get the input file
var file = process.argv[2];
var input = fs.readFileSync(file, 'utf8');

// model the data, generate the output summary
var customerOrderHistory = new CustomerOrderHistory();
var summary = customerOrderHistory.getSummary(input);

// print the summary
console.log(summary);
