var CustomerOrderHistory = require('../customer-order-history');
var Product = require('../../models/product');
var Order = require('../../models/order');
var ProductOrderSummary = require('../../models/product-order-summary');

describe('Model: CustomerOrderHistory', () => {

  var coh = new CustomerOrderHistory();
  var mockInput = 'PRODUCT foo 2.00\nPRODUCT bar 3.23\nORDER 20170101 foo 1 bar 2\nORDER 20100220 bar 3 foo 4\n';

  describe('method getSummary()', () => {

    var expectedOutput = 'foo: 5 sold for $10.00\nbar: 5 sold for $16.15';

    it('should return a valid summary output given any input', () => {
      expect(coh.getSummary(mockInput)).toEqual(expectedOutput)
    });

    it('should call mapProducts()', () => {
      var spy = spyOn(coh, 'mapProducts').and.callThrough();
      coh.getSummary(mockInput);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(mockInput);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call mapOrders()', () => {
      var spy = spyOn(coh, 'mapOrders').and.callThrough();
      coh.getSummary(mockInput);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(mockInput);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call mapProductOrderSummaries()', () => {
      var spy = spyOn(coh, 'mapProductOrderSummaries').and.callThrough();
      coh.getSummary(mockInput);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });

  });

  describe('method mapProducts()', () => {
    it('should return a valid product array given any input', () => {
      var expectedOutput = [
        new Product('foo', '2.00'),
        new Product('bar', '3.23')
      ];
      expect(coh.mapProducts(mockInput)).toEqual(expectedOutput);
    });
  });

  describe('method mapOrders()', () => {
    it('should return a valid orders array given any input', () => {
      var expectedOutput = [
        new Order('20170101', ['foo', '1', 'bar', '2']),
        new Order('20100220', ['bar', '3', 'foo', '4'])
      ];
      expect(coh.mapOrders(mockInput)).toEqual(expectedOutput);
    });
  });

  describe('method mapProductOrderSummaries()', () => {
    it('should return a valid ProductSummary array output given a valid input', () => {
      var expectedOutput = [
        new ProductOrderSummary(new Product('foo', '2.00'), 5),
        new ProductOrderSummary(new Product('bar', '3.23'), 5)
      ];
      var miProducts = coh.mapProducts(mockInput);
      var miOrders = coh.mapOrders(mockInput);
      expect(coh.mapProductOrderSummaries(miProducts, miOrders)).toEqual(expectedOutput);
    });
  });

});
