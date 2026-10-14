import axios from "axios";

import type {
  Payment,
  PaymentCreate,
  PaymentUpdate,
} from "@/src/types/paymentTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PAYMENT_URL = `${API_URL}/payments`;

export const paymentApi = {
  getAll: async (): Promise<Payment[]> => {
    const response = await axios.get<Payment[]>(PAYMENT_URL);
    return response.data;
  },

  getById: async (paymentId: number): Promise<Payment> => {
    const response = await axios.get<Payment>(`${PAYMENT_URL}/${paymentId}`);
    return response.data;
  },

  create: async (data: PaymentCreate): Promise<Payment> => {
    const response = await axios.post<Payment>(`${PAYMENT_URL}/`, data);
    return response.data;
  },

  update: async (paymentId: number, data: PaymentUpdate): Promise<Payment> => {
    const response = await axios.put<Payment>(
      `${PAYMENT_URL}/${paymentId}`,
      data,
    );
    return response.data;
  },

  delete: async (paymentId: number): Promise<void> => {
    await axios.delete(`${PAYMENT_URL}/${paymentId}`);
  },
};
