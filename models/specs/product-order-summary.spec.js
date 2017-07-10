var ProductOrderSummary = require('../product-order-summary');
var Product = require('../product');

describe('Model: ProductOrderSummary', () => {

  // move into BeforeEach()
  var product = new Product('foo', '30.25');
  var quantity = '2';
  var pos = new ProductOrderSummary(product, quantity);

  it('should have a string property \'productName\'', () => {
    expect(pos.productName).toEqual('foo');
  });

  it('should have a numeric property \'quantity\'', () => {
    expect(pos.quantity).toEqual(2);
  });

  it('should have a string property \'cost\' and extend to two decimal places', () => {
    expect(pos.cost).toEqual('60.50');
  });

  describe('method \'setCost\'', () => {
    it('should return quantity * unitPrice to two decimal places', () => {
      expect(pos.setCost('30.25')).toEqual('60.50');
    });
  });

  describe('method \'toString\'', () => {
    it('should return ProductOrderSummary object as a console-friendly string', () => {
      var expected = 'foo: 2 sold for $60.50';
      expect(pos.toString()).toEqual(expected);
    });
  });
});
