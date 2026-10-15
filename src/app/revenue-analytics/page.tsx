"use client";

import { useMemo, useState } from "react";

import PaymentsHeader from "@/src/components/payments/PaymentsHeader";
import PaymentSummaryCards from "@/src/components/payments/PaymentSummaryCards";
import PaymentToolbar from "@/src/components/payments/PaymentToolbar";
import PaymentTable from "@/src/components/payments/PaymentTable";
import PaymentFormModal from "@/src/components/payments/PaymentFormModal";
import DeletePaymentModal from "@/src/components/payments/DeletePaymentModal";
import PaymentsLoading from "@/src/components/payments/PaymentsLoading";
import PaymentsEmptyState from "@/src/components/payments/PaymentsEmptyState";

import { usePayments } from "@/src/hooks/usePayments";

import type { Payment, PaymentCreate } from "@/src/types/paymentTypes";

export default function PaymentsPage() {
  const {
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
  } = usePayments();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          String(payment.id),
          String(payment.user_id),
          String(payment.booking_id),
          payment.transaction_id ?? "",
          payment.payment_method,
          payment.status,
          payment.currency,
          String(payment.amount),
        ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesStatus =
        selectedStatus === "all" ||
        payment.status.toLowerCase() === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, selectedStatus]);

  function openCreateModal() {
    setSelectedPayment(null);
    setError(null);
    setNotice(null);
    setFormOpen(true);
  }

  function openEditModal(payment: Payment) {
    setSelectedPayment(payment);
    setError(null);
    setNotice(null);
    setFormOpen(true);
  }

  function closeFormModal() {
    if (saving) return;

    setFormOpen(false);
    setSelectedPayment(null);
  }

  async function handleSave(data: PaymentCreate, paymentId?: number) {
    await savePayment(data, paymentId);

    setFormOpen(false);
    setSelectedPayment(null);
  }

  async function handleDelete() {
    if (!paymentToDelete) return;

    try {
      await removePayment(paymentToDelete.id);
      setPaymentToDelete(null);
    } catch {
      // The hook exposes the error message in the page.
      // Keep the confirmation modal open so the user can retry.
    }
  }

  function clearFilters() {
    setSearch("");
    setSelectedStatus("all");
  }

  return (
    <div className="min-h-full space-y-6 bg-zinc-50/50 pb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <PaymentsHeader
        onAddPayment={openCreateModal}
        onRefresh={() => void fetchPayments(true)}
        refreshing={refreshing}
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 
          px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold text-rose-800">Request failed</p>

            <p className="mt-1 text-xs leading-5 text-rose-700">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError(null)}
            className="self-start text-xs font-semibold text-rose-700 hover:underline sm:self-auto"
          >
            Dismiss
          </button>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border 
          border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <p className="text-xs font-medium text-emerald-800">{notice}</p>

          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <PaymentsLoading />
      ) : (
        <>
          <PaymentSummaryCards payments={payments} />

          <PaymentToolbar
            search={search}
            onSearchChange={setSearch}
            status={selectedStatus}
            onStatusChange={setSelectedStatus}
            total={filteredPayments.length}
          />

          {filteredPayments.length > 0 ? (
            <PaymentTable
              payments={filteredPayments}
              onEdit={openEditModal}
              onDelete={(payment) => {
                setError(null);
                setPaymentToDelete(payment);
              }}
            />
          ) : (
            <PaymentsEmptyState
              search={search}
              onClear={clearFilters}
              onAdd={openCreateModal}
            />
          )}

          <div
            className="flex flex-col gap-1 px-1 text-[10px] text-zinc-500 
          sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              Displaying {filteredPayments.length} of {payments.length} loaded
              payment records.
            </span>

            <span>Payment data is retrieved from the backend API.</span>
          </div>
        </>
      )}

      <PaymentFormModal
        open={formOpen}
        payment={selectedPayment}
        saving={saving}
        onClose={closeFormModal}
        onSubmit={handleSave}
      />

      <DeletePaymentModal
        payment={paymentToDelete}
        deleting={deleting}
        onCancel={() => {
          if (!deleting) {
            setPaymentToDelete(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
