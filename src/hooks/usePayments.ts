"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { paymentApi } from "@/src/lib/api/paymentApi";

import type {
  Payment,
  PaymentCreate,
  PaymentUpdate,
} from "@/src/types/paymentTypes";

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg || "Validation error").join(", ");
    }

    if (error.response?.status === 401) {
      return "Please log in again to continue.";
    }

    if (error.response?.status === 403) {
      return "You do not have permission to perform this action.";
    }

    if (!error.response) {
      return "Cannot connect to the backend. Check whether FastAPI is running.";
    }
  }

  return "Something went wrong. Please try again.";
}

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchPayments = useCallback(async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const data = await paymentApi.getAll();
      setPayments(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchPayments();
  }, [fetchPayments]);

  const savePayment = async (
    data: PaymentCreate,
    paymentId?: number,
  ): Promise<void> => {
    setSaving(true);
    setError(null);
    setNotice(null);

    try {
      if (paymentId !== undefined) {
        // The backend PaymentUpdate schema does not accept user_id or booking_id.
        const updateData: PaymentUpdate = {
          amount: data.amount,
          currency: data.currency,
          payment_method: data.payment_method,
          status: data.status,
          transaction_id: data.transaction_id,
        };

        await paymentApi.update(paymentId, updateData);
        setNotice("Payment updated successfully.");
      } else {
        await paymentApi.create(data);
        setNotice("Payment created successfully.");
      }

      await fetchPayments(true);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setSaving(false);
    }
  };

  const removePayment = async (paymentId: number): Promise<void> => {
    setDeleting(true);
    setError(null);
    setNotice(null);

    try {
      await paymentApi.delete(paymentId);
      setPayments((current) =>
        current.filter((payment) => payment.id !== paymentId),
      );
      setNotice("Payment deleted successfully.");
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setDeleting(false);
    }
  };

  return {
    payments,
    loading,
    refreshing,
    saving,
    deleting,
    error,
    notice,
    setError,
    setNotice,
    fetchPayments,
    savePayment,
    removePayment,
  };
}
