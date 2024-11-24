export interface ReceiptItem {
  shortDescription: string;
  price: string;
}

export interface Receipt {
  retailer: string;
  purchaseDate: string; // use dayjs?
  purchaseTime: string;
  items: ReceiptItem[];
  total: string;
}

export interface ReceiptWithId extends Receipt {
  id: string;
}

/*
 * * * Mock values * * *
 */

export const mockReceiptItems = [
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

export const mockReceipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: mockReceiptItems,
  total: '35.35',
};
