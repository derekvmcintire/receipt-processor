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
    // Bind receipt to all calculation rules
    const rules = this.withReceipt(receipt);

    // Execute all rules and aggregate the points
    return (
      rules.calculateAlphaNumericCharactersPoints() +
      rules.calculateRoundDollarAmountPoints() +
      rules.calculateMultipleOfPointTwentyFivePoints() +
      rules.calculateEveryTwoItemsPoints() +
      rules.calculateItemDescriptionLengthPoints() +
      rules.calculateOddPurchaseDatePoints() +
      rules.calculatePurchaseTimePoints()
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
       * Rule 1: Calculate points based on the number of alphanumeric characters
       * in the retailer name.
       *
       * @returns Points for alphanumeric characters in the retailer name.
       */
      calculateAlphaNumericCharactersPoints: () => {
        return receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
      },

      /**
       * Rule 2: Award 50 points if the total amount is a round dollar amount.
       *
       * @returns Points for round dollar totals.
       */
      calculateRoundDollarAmountPoints: () => {
        return parseFloat(receipt.total) % 1 === 0 ? 50 : 0;
      },

      /**
       * Rule 3: Award 25 points if the total is a multiple of 0.25.
       *
       * @returns Points for totals that are multiples of 0.25.
       */
      calculateMultipleOfPointTwentyFivePoints: () => {
        return parseFloat(receipt.total) % 0.25 === 0 ? 25 : 0;
      },

      /**
       * Rule 4: Award 5 points for every two items in the receipt.
       *
       * @returns Points based on the number of items on the receipt.
       */
      calculateEveryTwoItemsPoints: () => {
        return Math.floor(receipt.items.length / 2) * 5;
      },

      /**
       * Rule 5: Award points for items with descriptions whose length is a multiple of 3.
       * Points awarded are 20% of the item's price (rounded up).
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
       * Rule 6: Award 6 points if the day of the purchase date is an odd number.
       *
       * @returns Points based on whether the purchase date day is odd.
       */
      calculateOddPurchaseDatePoints: () => {
        const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
        return day % 2 !== 0 ? 6 : 0;
      },

      /**
       * Rule 7: Award 10 points if the purchase time is between 2:00 PM and 4:00 PM.
       *
       * @returns Points for purchases made in the specified time range.
       */
      calculatePurchaseTimePoints: () => {
        const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
        return hour === 14 || (hour === 15 && minute === 0) ? 10 : 0;
      },
    };
  }
}
