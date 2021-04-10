'use strict';

const faker = require('faker');
const caps = require('../src/caps');
const vendor = require('../src/vendor');
const driver = require('../src/driver');
let testOrder = {
  store: '1-206-flowers',
  orderID: faker.datatype.uuid(),
  customer: faker.name.findName(),
  address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
};
let testPayload = {
  event: 'pickup',
  time: new Date().toISOString(),
  payload: testOrder,
};

describe('Events test', () => {
  let consoleSpy;
  jest.useFakeTimers();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('starts new order', () => {
    vendor.newOrder();
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
  });
  it('driver picks up orders after 1 second', () => {
    driver.pickUp(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
  it('driver delivers orders after 3 second', () => {
    driver.delivered(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });
  it('vendor sends thank you note', () => {
    vendor.thankYou(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});
