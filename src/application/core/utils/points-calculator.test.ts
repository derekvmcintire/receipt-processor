import { Receipt, mockReceiptItems } from '../../../types/domain/receipt';
import { PointsCalculator } from './points-calculator';

describe('PointsCalculator', () => {
  let calculator: PointsCalculator;

  beforeEach(() => {
    calculator = new PointsCalculator();
  });

  it('should calculate points based on alphanumeric characters in retailer name', () => {
    const receipt: Receipt = {
      retailer: 'Target123',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: mockReceiptItems,
      total: '35.35',
    };

    // Test the calculation rule directly
    // need to use bracket notation because .withReceipt is a private class method
    const points =
      calculator['withReceipt'](
        receipt
      ).calculateAlphaNumericCharactersPoints();
    expect(points).toBe(9); // Target123 has 9 alphanumeric characters
  });

  it('should calculate points for round dollar amounts', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: mockReceiptItems,
      total: '50.00',
    };

    const points =
      calculator['withReceipt'](receipt).calculateRoundDollarAmountPoints();
    expect(points).toBe(50); // Total is a round dollar amount
  });

  it('should calculate points for amounts that are a multiple of 0.25', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: mockReceiptItems,
      total: '35.25',
    };

    const points =
      calculator['withReceipt'](
        receipt
      ).calculateMultipleOfPointTwentyFivePoints();
    expect(points).toBe(25); // Total is a multiple of 0.25
  });

  it('should calculate points for every two items', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: mockReceiptItems,
      total: '35.35',
    };

    const points =
      calculator['withReceipt'](receipt).calculateEveryTwoItemsPoints();
    expect(points).toBe(10); // 5 items, so 5 // 2 = 2 sets of 2, so 2 * 5 = 10 points
  });

  it('should calculate points for items with description length that is a multiple of 3', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Mountain Dew', price: '6.49' },
        { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
        { shortDescription: 'Knorr Creamy Chicken', price: '1.26' },
      ],
      total: '35.00',
    };

    const points =
      calculator['withReceipt'](receipt).calculateItemDescriptionLengthPoints();
    expect(points).toBe(5); // 3 points for 'Mountain Dew' and 2 points for 'Emils Cheese Pizza'
  });

  it('should calculate points for odd purchase date', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01', // Odd day (1st)
      purchaseTime: '13:01',
      items: mockReceiptItems,
      total: '35.35',
    };

    const receiptDate = new Date(
      receipt.purchaseDate + ' ' + receipt.purchaseTime
    );

    const points =
      calculator['withReceipt'](receipt).calculateOddPurchaseDatePoints(
        receiptDate
      );
    expect(points).toBe(6); // Odd purchase date (1st)
  });

  it('should calculate points for purchase time between 2:00 PM and 4:00 PM', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '14:30', // Between 2:00 PM and 4:00 PM
      items: mockReceiptItems,
      total: '35.35',
    };

    const receiptDate = new Date(
      receipt.purchaseDate + ' ' + receipt.purchaseTime
    );

    const points =
      calculator['withReceipt'](receipt).calculatePurchaseTimePoints(
        receiptDate
      );
    expect(points).toBe(10); // Purchase time is between 2:00 PM and 4:00 PM
  });

  it('should calculate zero points for purchase time outside of 2:00 PM - 4:00 PM', () => {
    const receipt: Receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '16:01', // After 4:00 PM
      items: mockReceiptItems,
      total: '35.35',
    };

    const receiptDate = new Date(
      receipt.purchaseDate + ' ' + receipt.purchaseTime
    );

    const points =
      calculator['withReceipt'](receipt).calculatePurchaseTimePoints(
        receiptDate
      );
    expect(points).toBe(0); // Purchase time is not between 2:00 PM and 4:00 PM
  });
});
