export interface ReceiptItem {
  description: string;
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

export interface PointsResponse {
  points: number;
}

export type PostReceiptResponse = {
  id: string;
}

export type GetReceiptResponse = {
  points: number;
}
