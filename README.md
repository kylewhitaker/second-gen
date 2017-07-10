# Overview
My solution to the [SecondGenCodingProblem](https://gist.github.com/nwallace/f7c0475b97f90b8117b6153d2bc73618) using Javascript, Node, and Jasmine.
# Setup & run via console
[Install Node & NPM](https://nodejs.org/en/download/)

To run program via console:
```
$ node main.js inputs/input-01.txt   // sample input file
```
To run Jasmine unit tests:
```
$ npm install   // install Jasmine dependendies, node_modules folder (one-time)
$ npm test      // execute unit tests in console using Jasmine CLI
```
# Development
## Main.js
* Keep the executable small. Let a utility class handle the grunt work.
## CustomerOrderHistory.js
* Sole utility class to handle the grunt work of object mapping, order filtering, and product output sorting.
## Domain Modeling
Object  | Properties  | Purpose
:------ | :---------- | :-------
ProductOrderSummary | ProductName, Quantity, Cost | Model data for each *output* line
Product | Name, UnitPrice | Model *input* data for each PRODUCT line
Order | Date, LineItems | Model *input* data for each ORDER line
LineItem | ProductName, Quantity | Sub-model *input* data for each ORDER line
## Unit Testing
* Jasmine framework + Jasmine CLI test runner (simple, gets the job done)
* Specs bunched together in same "neighborhood" as tested code
### Acceptance Testing
* Manual smoke testing using sample input files (e.g., inputs/input-01.txt)
* Notable considerations:
   1. `Unit Price` - Maintain two decimal places from input, to calculations, to output.
   2. `Order Date` - Orders before year 2000 are not included in output calculations.
   3. `Sorting` - Output displays product lines ordered by quantity, high to low.
### Assumptions
* Input files are formatted correctly (no null exceptions)
