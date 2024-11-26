import { Receipt } from '../../../types/domain/receipt';

/**
 * PointsCalculator calculates reward points based on a set of predefined rules.
 */
export class PointsCalculator {
  /**
   * Main method to calculate total points for a given receipt.
   *
   * @param receipt - The receipt object containing details of the purchase.
   * @returns The total points calculated for the receipt.
   */
  calculate(receipt: Receipt): number {
    const receiptDate = new Date(
      receipt.purchaseDate + ' ' + receipt.purchaseTime
    );

    if (isNaN(receiptDate.getTime())) {
      throw new Error(
        'Unable to calculate points with purchaseDate or purchaseTime'
      );
    }

    // Bind receipt to all calculation rules
    const rules = this.withReceipt(receipt);

    // Execute all rules and aggregate the points
    return (
      rules.calculateAlphaNumericCharactersPoints() +
      rules.calculateRoundDollarAmountPoints() +
      rules.calculateMultipleOfPointTwentyFivePoints() +
      rules.calculateEveryTwoItemsPoints() +
      rules.calculateItemDescriptionLengthPoints() +
      rules.calculateOddPurchaseDatePoints(receiptDate) +
      rules.calculatePurchaseTimePoints(receiptDate)
    );
  }

  /**
   * Creates an object containing all calculation rules bound to the provided receipt.
   * Each method in the returned object calculates points for one specific rule.
   *
   * @param receipt - The receipt object to bind to the calculation rules.
   * @returns An object with calculation methods for each rule.
   */
  private withReceipt(receipt: Receipt) {
    return {
      /**
       * Rule 1: One point for every alphanumeric character in the retailer name.
       *
       * @returns Points for alphanumeric characters in the retailer name.
       */
      calculateAlphaNumericCharactersPoints: () => {
        const cleanedRetailer = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '');
        return cleanedRetailer.length; // Count alphanumeric characters only
      },

      /**
       * Rule 2: 50 points if the total is a round dollar amount with no cents.
       *
       * @returns Points for round dollar totals.
       */
      calculateRoundDollarAmountPoints: () => {
        return parseFloat(receipt.total) % 1 === 0 ? 50 : 0;
      },

      /**
       * Rule 3: 25 points if the total is a multiple of 0.25.
       *
       * @returns Points for totals that are multiples of 0.25.
       */
      calculateMultipleOfPointTwentyFivePoints: () => {
        return parseFloat(receipt.total) % 0.25 === 0 ? 25 : 0;
      },

      /**
       * Rule 4: 5 points for every two items on the receipt.
       *
       * @returns Points based on the number of items on the receipt.
       */
      calculateEveryTwoItemsPoints: () => {
        return Math.floor(receipt.items.length / 2) * 5;
      },

      /**
       * Rule 5: If the trimmed length of the item description is a multiple of 3,
       * multiply the price by 0.2 and round up to the nearest integer. The result
       * is the number of points earned.
       *
       * @returns Points for item descriptions with a length that is a multiple of 3.
       */
      calculateItemDescriptionLengthPoints: () => {
        let points = 0;
        for (const item of receipt.items) {
          const trimmedDesc = item.shortDescription.trim();
          if (trimmedDesc.length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
          }
        }
        return points;
      },

      /**
       * Rule 6: 6 points if the day in the purchase date is odd.
       *
       * @returns Points based on whether the purchase date day is odd.
       */
      calculateOddPurchaseDatePoints: (receiptDate: Date) => {
        const day = receiptDate.getDate();
        return day % 2 !== 0 ? 6 : 0;
      },

      /**
       * Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
       *
       * @returns Points for purchases made in the specified time range.
       */
      calculatePurchaseTimePoints: (receiptDate: Date) => {
        const purchaseTime =
          receiptDate.getHours() * 60 + receiptDate.getMinutes(); // Time in minutes since midnight
        const startTime = 14 * 60; // 2:00 PM in minutes since midnight
        const endTime = 16 * 60; // 4:00 PM in minutes since midnight

        // Check if the purchase time is between 2:00 PM and 4:00 PM
        if (purchaseTime >= startTime && purchaseTime < endTime) {
          return 10;
        }

        return 0;
      },
    };
  }
}
