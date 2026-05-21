"use client";

import React, { useState } from "react";
import { Icons } from "@/src/components/Icons";

export default function RevenueAnalytics() {
  const [selectedRange, setSelectedRange] = useState("Month-to-Date");

  const finances = [
    { label: "Gross Platform Volume", value: "$1,248,500", change: "+16.8%", isPositive: true },
    { label: "Net Platform Commission (5%)", value: "$62,425", change: "+16.8%", isPositive: true },
    { label: "Paid Out Commissions", value: "$48,900", change: "+12.4%", isPositive: true },
    { label: "Pending Agent Balances", value: "$13,525", change: "-2.4%", isPositive: false },
  ];

  const transactions = [
    { id: "TXN-9021", user: "Sarah Jenkins", role: "Agent", type: "Commission Payout", amount: "$3,450", date: "May 20, 2026", status: "Completed" },
    { id: "TXN-9022", user: "Michael Chen", role: "Buyer", type: "Booking Deposit", amount: "$1,200", date: "May 19, 2026", status: "Completed" },
    { id: "TXN-9023", user: "Alex Rivera", role: "Agent", type: "Commission Payout", amount: "$5,120", date: "May 18, 2026", status: "Pending" },
    { id: "TXN-9024", user: "Emma Watson", role: "Agent", type: "Commission Payout", amount: "$2,400", date: "May 18, 2026", status: "Completed" },
    { id: "TXN-9025", user: "Robert Downey", role: "Seller", type: "Listing Promotion Fee", amount: "$150", date: "May 17, 2026", status: "Completed" },
  ];

  const categorySplit = [
    { name: "Penthouses", amount: "$450,200", percentage: 36, color: "bg-rose-500" },
    { name: "Villas", amount: "$380,400", percentage: 30, color: "bg-amber-500" },
    { name: "Apartments", amount: "$250,900", percentage: 20, color: "bg-indigo-500" },
    { name: "Houses", amount: "$167,000", percentage: 14, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Financial overview banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 text-white shadow-xl">
        <div>
          <h2 className="text-xl font-bold">Revenue & Financial Analytics</h2>
          <p className="text-zinc-400 text-xs mt-1">Track financial ledger entries, gross booking volumes, and platform commission shares.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/80 p-1 rounded-lg border border-zinc-700/50 self-start sm:self-auto">
          {["Month-to-Date", "Quarter-to-Date", "Year-to-Date"].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedRange === r ? "bg-white text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Finance Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {finances.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700"
          >
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">{item.label}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">{item.value}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                }`}
              >
                {item.change}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Audit verified ledger</span>
          </div>
        ))}
      </div>

      {/* Bar Chart & Category Split Split section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Split progress bars */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Revenue Yield by Typology</h3>
            <p className="text-xs text-zinc-400">Typology contribution to platform yield</p>
          </div>

          <div className="space-y-4 pt-2">
            {categorySplit.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <span>{cat.name}</span>
                  <span>{cat.amount} ({cat.percentage}%)</span>
                </div>
                {/* Visual bar */}
                <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-850">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Ledger Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">Recent Financial Operations</h3>
              <p className="text-xs text-zinc-400">Commissions payouts and deposits audit ledger</p>
            </div>
            <span className="text-xs font-semibold text-rose-500 cursor-pointer hover:underline">Download Audit PDF</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-2.5">TXN ID</th>
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5 text-right">Amount</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50 font-medium">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="py-3 text-zinc-400 font-mono">{txn.id}</td>
                    <td className="py-3 font-bold text-zinc-900 dark:text-zinc-100">{txn.user} <span className="text-[10px] text-zinc-400 font-medium font-sans">({txn.role})</span></td>
                    <td className="py-3 text-zinc-500 dark:text-zinc-400">{txn.type}</td>
                    <td className="py-3 text-zinc-400">{txn.date}</td>
                    <td className="py-3 font-bold text-right text-zinc-900 dark:text-zinc-100">{txn.amount}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                          txn.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                        }`}
                      >
                        {txn.status}
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
