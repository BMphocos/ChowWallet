import {Plus,ChevronRight,Bell,Utensils,ArrowUpRight,ArrowDownLeft} from "lucide-react";
import  TRANSACTIONS  from "../components/data/transactions";



function Dashboard({
balance,
onOrder,
onTopUp,
}: {
balance: number;
onOrder: () => void;
onTopUp: () => void;
}) {
return (
    <div className="flex-1 overflow-y-auto pb-2">
      {/* Header */}
    <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <div>
        <p className="text-muted-foreground text-sm font-medium">Good afternoon,</p>
    <h1 className="text-xl font-bold text-foreground">Kwame Asante 👋</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <Bell className="w-5 h-5 text-foreground" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
    </div>

      {/* Wallet Card */}
    <div className="px-5 mb-6">
        <div
        className="relative rounded-2xl p-6 overflow-hidden"
        style={{
            background: "#212121",
            boxShadow: "0 8px 32px rgba(33,33,33,0.25)",
        }}
        >
          {/* Decorative circles */}
        <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-10"
            style={{ background: "#FF9800" }}
        />
        <div
            className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full opacity-10"
            style={{ background: "#FF5722" }}
        />

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
                >
                  C
                </div>
                <span className="text-white/70 text-sm font-medium">ChowWallet</span>
              </div>
              <span className="text-white/40 text-xs tracking-widest font-mono">•••• 4821</span>
            </div>

            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">
              Current Balance
            </p>
            <p className="text-white text-4xl font-bold tracking-tight">
              ₵{balance.toFixed(2)}
            </p>

            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide">Card Holder</p>
                <p className="text-white text-sm font-semibold mt-0.5">Kwame Asante</p>
              </div>
              <div className="flex gap-1">
                <div className="w-7 h-7 rounded-full bg-[#FF9800] opacity-80" />
                <div className="w-7 h-7 rounded-full bg-[#FF5722] -ml-3 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-7">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onTopUp}
            className="flex items-center gap-3 rounded-2xl p-4 text-white font-semibold text-sm transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)", boxShadow: "0 4px 16px rgba(255,87,34,0.35)" }}
          >
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Plus className="w-5 h-5" />
            </span>
            <span className="leading-tight">Top Up<br />Wallet</span>
          </button>
          <button
            onClick={onOrder}
            className="flex items-center gap-3 rounded-2xl p-4 text-white font-semibold text-sm transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)", boxShadow: "0 4px 16px rgba(255,87,34,0.35)" }}
          >
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5" />
            </span>
            <span className="leading-tight">Order<br />Food</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Spent Today", value: "₵25.00", color: "#EF4444" },
            { label: "This Week", value: "₵55.50", color: "#FF9800" },
            { label: "Orders", value: "12", color: "#10B981" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="font-bold text-base" style={{ color }}>{value}</p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground text-base">Recent Transactions</h2>
          <button className="text-primary text-sm font-medium flex items-center gap-0.5">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="bg-card border border-border rounded-2xl flex items-center gap-3 px-4 py-3"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {tx.vendor}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">{tx.time}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {tx.type === "debit" ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-green-500" />
                )}
                <span
                  className="font-bold text-sm"
                  style={{ color: tx.type === "debit" ? "#EF4444" : "#10B981" }}
                >
                  {tx.type === "debit" ? "-" : "+"}₵{tx.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}

