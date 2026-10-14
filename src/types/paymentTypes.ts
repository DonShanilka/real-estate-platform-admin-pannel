export type PaymentMethod = "card" | "bank_transfer" | "cash";

export type PaymentStatus =
  | "pending"
  | "successful"
  | "failed"
  | "refunded";

export interface Payment {
  id: number;
  user_id: number;
  booking_id: number;
  amount: number | string;
  currency: string;
  payment_method: PaymentMethod | string;
  status: PaymentStatus | string;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentCreate {
  user_id: number;
  booking_id: number;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  transaction_id: string | null;
}

export interface PaymentUpdate {
  amount?: number;
  currency?: string;
  payment_method?: PaymentMethod;
  status?: PaymentStatus;
  transaction_id?: string | null;
}