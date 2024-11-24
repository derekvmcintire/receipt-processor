import { Receipt } from '../domain/receipt';
import { mockReceipt } from '../mocks';

export interface ProcessReceiptPayload extends Receipt {}

export type PostReceiptResponse = {
  id: string;
};

/*
 * * * Mock values * * *
 */

export const mockProcessReceiptPayload = mockReceipt;

export const mockPostReceiptResponse = {
  id: '7fb1377b-b223-49d9-a31a-5a02701dd310',
};
