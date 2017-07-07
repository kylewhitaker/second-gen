var fs = require('fs');
var CustomerOrderHistory = require('./models/customer-order-history');

// get the input file
var inputFile = process.argv[2];
var fileAsString = fs.readFileSync(inputFile, 'utf8');

// model the data
var customerOrderHistory = new CustomerOrderHistory(fileAsString);

// generate the output summary
console.log(customerOrderHistory.input);
console.log(customerOrderHistory.getSummary());
