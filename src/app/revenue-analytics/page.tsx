"use client";

import React, { useState } from "react";

export default function RevenueAnalytics() {
  const [selectedRange, setSelectedRange] = useState("Month-to-Date");

  const finances = [
    {
      label: "Gross Platform Volume",
      value: "$1,248,500",
      change: "+16.8%",
      isPositive: true,
    },
    {
      label: "Net Platform Commission (5%)",
      value: "$62,425",
      change: "+16.8%",
      isPositive: true,
    },
    {
      label: "Paid Out Commissions",
      value: "$48,900",
      change: "+12.4%",
      isPositive: true,
    },
    {
      label: "Pending Agent Balances",
      value: "$13,525",
      change: "-2.4%",
      isPositive: false,
    },
  ];

  const transactions = [
    {
      id: "TXN-9021",
      user: "Sarah Jenkins",
      role: "Agent",
      type: "Commission Payout",
      amount: "$3,450",
      date: "May 20, 2026",
      status: "Completed",
    },
    {
      id: "TXN-9022",
      user: "Michael Chen",
      role: "Buyer",
      type: "Booking Deposit",
      amount: "$1,200",
      date: "May 19, 2026",
      status: "Completed",
    },
    {
      id: "TXN-9023",
      user: "Alex Rivera",
      role: "Agent",
      type: "Commission Payout",
      amount: "$5,120",
      date: "May 18, 2026",
      status: "Pending",
    },
    {
      id: "TXN-9024",
      user: "Emma Watson",
      role: "Agent",
      type: "Commission Payout",
      amount: "$2,400",
      date: "May 18, 2026",
      status: "Completed",
    },
    {
      id: "TXN-9025",
      user: "Robert Downey",
      role: "Seller",
      type: "Listing Promotion Fee",
      amount: "$150",
      date: "May 17, 2026",
      status: "Completed",
    },
  ];

  const categorySplit = [
    {
      name: "Penthouses",
      amount: "$450,200",
      percentage: 36,
      color: "bg-rose-500",
    },
    {
      name: "Villas",
      amount: "$380,400",
      percentage: 30,
      color: "bg-amber-500",
    },
    {
      name: "Apartments",
      amount: "$250,900",
      percentage: 20,
      color: "bg-indigo-500",
    },
    {
      name: "Houses",
      amount: "$167,000",
      percentage: 14,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Financial Overview Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Revenue & Financial Analytics
          </h2>

          <p className="mt-1 text-xs text-zinc-600">
            Track financial ledger entries, gross booking volumes, and platform
            commission shares.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex flex-wrap items-center gap-1 self-start rounded-lg border border-zinc-200 bg-zinc-50 p-1 sm:self-auto">
          {["Month-to-Date", "Quarter-to-Date", "Year-to-Date"].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedRange === range
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-white hover:text-zinc-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {finances.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
          >
            <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {item.label}
            </span>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">
                {item.value}
              </span>

              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  item.isPositive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {item.change}
              </span>
            </div>

            <span className="mt-2 block text-[10px] text-zinc-500">
              Audit verified ledger
            </span>
          </div>
        ))}
      </div>

      {/* Revenue Chart and Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue by Property Category */}
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              Revenue Yield by Typology
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              Typology contribution to platform yield
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {categorySplit.map((category) => (
              <div key={category.name} className="space-y-1.5">
                <div className="flex justify-between gap-3 text-xs font-bold text-zinc-800">
                  <span>{category.name}</span>

                  <span className="text-right">
                    {category.amount} ({category.percentage}%)
                  </span>
                </div>

                {/* Revenue Progress Bar */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Transactions Table */}
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                Recent Financial Operations
              </h3>

              <p className="mt-1 text-xs text-zinc-600">
                Commission payouts and deposits audit ledger
              </p>
            </div>

            <button
              type="button"
              className="self-start text-xs font-semibold text-rose-600 transition-colors hover:text-rose-700 hover:underline sm:self-auto"
            >
              Download Audit PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                  <th className="whitespace-nowrap px-3 py-3">TXN ID</th>

                  <th className="whitespace-nowrap px-3 py-3">User</th>

                  <th className="whitespace-nowrap px-3 py-3">Type</th>

                  <th className="whitespace-nowrap px-3 py-3">Date</th>

                  <th className="whitespace-nowrap px-3 py-3 text-right">
                    Amount
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="text-zinc-700 transition-colors hover:bg-zinc-50"
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-500">
                      {transaction.id}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="font-bold text-zinc-900">
                        {transaction.user}
                      </span>

                      <span className="ml-1 text-[10px] font-medium text-zinc-500">
                        ({transaction.role})
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-zinc-600">
                      {transaction.type}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-zinc-500">
                      {transaction.date}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-bold text-zinc-900">
                      {transaction.amount}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <span
                        className={`inline-block rounded px-2 py-1 text-[9px] font-bold ${
                          transaction.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
