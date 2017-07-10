var Order = require('../order');
var LineItem = require('../line-item');

describe('Model: Order', () => {

  var date = '20170101';
  var productsAndQuantities = ['foo', '1', 'bar', '2'];
  var order = new Order(date, productsAndQuantities);
  var expectedLineItems = [
    new LineItem('foo', '1'),
    new LineItem('bar', '2')
  ];

  it('should have a string property \'date\'', () => {
    expect(order.date).toEqual(date);
  });

  it('should have an array property \'lineItems\'', () => {
    expect(order.lineItems).toEqual(expectedLineItems);
  });

  describe('method \'setLineItems\'', () => {
    it('should return an array of LineItems', () => {
      expect(order.setLineItems(productsAndQuantities)).toEqual(expectedLineItems);
    });
  });

});
