'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.mockReceipt = exports.mockReceiptItems = void 0;
/*
 * * * Mock values * * *
 */
exports.mockReceiptItems = [
  {
    shortDescription: 'Mountain Dew 12PK',
    price: '6.49',
  },
  {
    shortDescription: 'Emils Cheese Pizza',
    price: '12.25',
  },
  {
    shortDescription: 'Knorr Creamy Chicken',
    price: '1.26',
  },
  {
    shortDescription: 'Doritos Nacho Cheese',
    price: '3.35',
  },
  {
    shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
    price: '12.00',
  },
];
exports.mockReceipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: exports.mockReceiptItems,
  total: '35.35',
};
