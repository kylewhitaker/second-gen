var LineItem = require('../line-item');

describe('Model: LineItem', () => {

  var productName = 'foo';
  var quantity = '1';
  var lineItem = new LineItem(productName, quantity);

  it('should have a string property \'productName\'', () => {
    expect(lineItem.productName).toEqual('foo');
  });

  it('should have a numeric property \'quantity\'', () => {
    expect(lineItem.quantity).toEqual(1);
  });

});
