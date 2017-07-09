var Product = require('../product');

describe('Model: Product', () => {

  var name = 'foo';
  var unitPrice = '30.25';
  var product = new Product(name, unitPrice);

  it('should have a string property \'name\'', () => {
    expect(product.name).toEqual(name);
  });

  it('should have a string property \'unitPrice\'', () => {
    expect(product.unitPrice).toEqual(unitPrice);
  });

});
