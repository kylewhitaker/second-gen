var CustomerOrderHistory = require('../customer-order-history');
var Product = require('../../models/product');
var Order = require('../../models/order');
var ProductOrderSummary = require('../../models/product-order-summary');

describe('Model: CustomerOrderHistory', () => {

  var coh = new CustomerOrderHistory();
  var mockInput = 'PRODUCT foo 2.00\nPRODUCT bar 3.23\nORDER 20170101 foo 1 bar 2\nORDER 20100220 bar 3 foo 4\n';

  describe('method getSummary()', () => {

    it('should return a valid summary output given any input', () => {
      var expectedOutput = 'foo: 5 sold for $10.00\nbar: 5 sold for $16.15';
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
      var products = coh.mapProducts(mockInput);
      var orders = coh.mapOrders(mockInput);

      coh.getSummary(mockInput);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(products, orders);
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

    var products = coh.mapProducts(mockInput);
    var orders = coh.mapOrders(mockInput);

    it('should return a valid ProductSummary array output given a valid input', () => {
      var expectedOutput = [
        new ProductOrderSummary(new Product('foo', '2.00'), 5),
        new ProductOrderSummary(new Product('bar', '3.23'), 5)
      ];
      expect(coh.mapProductOrderSummaries(products, orders)).toEqual(expectedOutput);
    });

    it('should call \'orderDateBefore2000\'', () => {
      var spy = spyOn(coh, 'orderDateBefore2000').and.callThrough();

      coh.mapProductOrderSummaries(products, orders);

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('method orderDateBefore2000', () => {

    it('should return true if date is before 20000101', () => {
      var date = '19991231';
      expect(coh.orderDateBefore2000(date)).toBeTruthy();
    });

    it('should return false if date is equal to 20000101', () => {
      var date = '20000101';
      expect(coh.orderDateBefore2000(date)).toBeFalsy();
    });

    it('should return false if date is after 20000101', () => {
      var date = '20150615';
      expect(coh.orderDateBefore2000(date)).toBeFalsy();
    });

  });

});
