import { useState } from "react";
import {ArrowDownLeft,ArrowUpRight} from "lucide-react-native";


import { ALL_TRANSACTIONS } from "./data/transactions";

type TxFilter = "All" | "Orders" | "Top Ups";

export default function History() {
const [filter, setFilter] = useState<TxFilter>("All");
const [expanded, setExpanded] = useState<number | null>(null);

const filtered = ALL_TRANSACTIONS.filter((t) => {
    if (filter === "Orders") return t.type === "debit";
    if (filter === "Top Ups") return t.type === "credit";
    return true;
});
const totalSpent = ALL_TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
const totalTopUp = ALL_TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);

return (
    <div className="flex-1 overflow-y-auto pb-4">
      {/* Header */}
    <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground text-sm mt-0.5">All your wallet activity</p>
    </div>

      {/* Summary cards */}
    <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight className="w-4 h-4 text-red-500" />
            <p className="text-xs text-muted-foreground font-medium">Total Spent</p>
        </div>
        <p className="text-xl font-bold text-foreground">₵{totalSpent.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
            {ALL_TRANSACTIONS.filter((t) => t.type === "debit").length} orders
        </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
            <ArrowDownLeft className="w-4 h-4 text-green-500" />
            <p className="text-xs text-muted-foreground font-medium">Total Added</p>
        </div>
        <p className="text-xl font-bold text-foreground">₵{totalTopUp.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
            {ALL_TRANSACTIONS.filter((t) => t.type === "credit").length} top ups
        </p>
        </div>
    </div>

      {/* Filter pills */}
    <div className="px-5 mb-4 flex gap-2">
        {(["All", "Orders", "Top Ups"] as TxFilter[]).map((f) => (
        <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === f ? "text-white" : "bg-card border border-border text-muted-foreground"
            }`}
            style={filter === f ? { background: "linear-gradient(135deg, #FF9800, #FF5722)" } : {}}
        >
            {f}
        </button>
        ))}
    </div>

      {/* Transaction list */}
    <div className="px-5 space-y-2">
        {filtered.map((tx) => (
        <div key={tx.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left"
            onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
            >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{tx.vendor}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{tx.time}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span
                className="font-bold text-sm"
                style={{ color: tx.type === "debit" ? "#EF4444" : "#10B981" }}
                >
                {tx.type === "debit" ? "−" : "+"}₵{tx.amount.toFixed(2)}
                </span>
                <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    tx.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : tx.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-700"
                }`}
                >
                {tx.status}
                </span>
            </div>
            </button>
            {expanded === tx.id && (
            <div className="border-t border-border px-4 py-3 bg-muted/40 flex justify-between text-xs text-muted-foreground">
                <div>
                <p className="mb-0.5">Type</p>
                <p className="font-semibold text-foreground">{tx.label}</p>
                </div>
                <div className="text-center">
                <p className="mb-0.5">Status</p>
                <p className="font-semibold text-foreground">{tx.status}</p>
                </div>
                <div className="text-right">
                <p className="mb-0.5">Reference</p>
                <p className="font-semibold text-foreground">{tx.ref}</p>
                </div>
            </div>
            )}
        </div>
        ))}
    </div>
    <div className="h-4" />
    </div>
);
}