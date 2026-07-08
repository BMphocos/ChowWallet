import { Clock, Home, LayoutGrid, User } from "lucide-react-native";
import { useState } from "react";

import Dashboard from "../components/Dashboard";
import History from "../components/History";
import Marketplace from "../components/MarketPlace";
import Profile from "../components/Profile";
import TopUpModal from "../components/TopUpModal";

import { VENDORS } from "../components/data/vendors";
import type { Screen } from "../components/type";

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  const [cart, setCart] = useState<Record<number, number>>({});
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const [balance, setBalance] = useState(75.0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = VENDORS.flatMap((v) => v.items).find(
      (i) => i.id === Number(id),
    );
    return sum + (item?.price ?? 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  function addToCart(itemId: number) {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  }

  function handleTopUp(amount: number) {
    setBalance((b) => b + amount);
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      setTopUpVisible(false);
    }, 1500);
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{
        fontFamily: "'Poppins', sans-serif",
        maxWidth: 430,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {screen === "dashboard" && (
        <Dashboard
          balance={balance}
          onOrder={() => setScreen("marketplace")}
          onTopUp={() => setTopUpVisible(true)}
        />
      )}
      {screen === "marketplace" && (
        <Marketplace
          cart={cart}
          cartTotal={cartTotal}
          cartCount={cartCount}
          onAddToCart={addToCart}
        />
      )}
      {screen === "history" && <History />}
      {screen === "profile" && (
        <Profile balance={balance} onTopUp={() => setTopUpVisible(true)} />
      )}

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 bg-card border-t border-border flex items-center justify-around py-3 px-4 z-30">
        {(
          [
            { label: "Home", icon: Home, s: "dashboard" },
            { label: "Order", icon: LayoutGrid, s: "marketplace" },
            { label: "History", icon: Clock, s: "history" },
            { label: "Profile", icon: User, s: "profile" },
          ] as { label: string; icon: typeof Home; s: Screen }[]
        ).map(({ label, icon: Icon, s }) => (
          <button
            key={label}
            onClick={() => setScreen(s)}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
              screen === s ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      {/* Top Up Modal */}
      {topUpVisible && (
        <TopUpModal
          onClose={() => setTopUpVisible(false)}
          onTopUp={handleTopUp}
          success={topUpSuccess}
        />
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
