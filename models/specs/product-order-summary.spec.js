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

  it('should have a string property \'cost\'', () => {
    expect(pos.cost).toEqual('60.50');
  });

  describe('method \'setCost\'', () => {
    it('should return quantity * unitPrice to two decimal places', () => {
      // test run order dependency - not good
      var tempPOS = new ProductOrderSummary(product, '4');
      expect(tempPOS.setCost('10.25')).toEqual('41.00');
    });
  });

  describe('method \'toString\'', () => {
    it('should return ProductOrderSummary object as a console-friendly string', () => {
      // code smell: too much setup, dependencies
      var tempProduct = {
        name: 'bar',
        unitPrice: '3.99'
      };
      var tempPOS = new ProductOrderSummary(tempProduct, '3');
      var expectedToString = 'bar: 3 sold for $11.97';
      expect(tempPOS.toString()).toEqual(expectedToString);
    });
  });
});
