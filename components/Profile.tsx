import { ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";

export default function Profile({
  balance,
  onTopUp,
}: {
  balance: number;
  onTopUp: () => void;
}) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [biometricsOn, setBiometricsOn] = useState(false);

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: "👤", label: "Personal Information", hint: "Kwame Asante" },
        { icon: "📍", label: "Delivery Addresses", hint: "2 saved" },
        { icon: "🏦", label: "Linked MoMo Number", hint: "0244 ••• 412" },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "🔔",
          label: "Push Notifications",
          toggle: true,
          value: notificationsOn,
          onToggle: () => setNotificationsOn((v) => !v),
        },
        {
          icon: "🔑",
          label: "Biometric Login",
          toggle: true,
          value: biometricsOn,
          onToggle: () => setBiometricsOn((v) => !v),
        },
        { icon: "🌍", label: "Language", hint: "English" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "💬", label: "Help & Support", hint: "" },
        { icon: "📄", label: "Terms & Privacy", hint: "" },
        { icon: "⭐", label: "Rate ChowWallet", hint: "" },
      ],
    },
  ];



  return (

    <div className="flex-1 overflow-y-auto pb-4">
      {/* Hero banner */}
      <div
        className="relative pt-12 pb-6 px-5"
        style={{
          background: "linear-gradient(160deg, #FF9800 0%, #FF5722 100%)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30">
            🧑🏾
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Kwame Asante</h1>
            <p className="text-white/80 text-sm">kwame.asante@gmail.com</p>
            <p className="text-white/60 text-xs mt-0.5">
              Member since Jan 2024 · Gold tier
            </p>
          </div>
        </div>
      </div>

      {/* Balance + top up */}
      <div className="px-5 -mt-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Wallet Balance
            </p>
            <p className="text-2xl font-bold text-foreground">
              ₵{balance.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onTopUp}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
          >
            <Plus className="w-4 h-4" />
            Top Up
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Orders", value: "12", emoji: "🍽️" },
          { label: "Saved", value: "₵8.50", emoji: "💰" },
          { label: "Points", value: "340", emoji: "⭐" },
        ].map(({ label, value, emoji }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-2xl p-3 text-center"
          >
            <p className="text-xl mb-1">{emoji}</p>
            <p className="font-bold text-foreground text-base">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Menu sections */}
      <div className="px-5 space-y-5">
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5"
                >
                  <span className="text-lg w-7 text-center flex-shrink-0">
                    {item.icon}
                  </span>
                  <p className="flex-1 text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  {"toggle" in item && item.toggle ? (
                    <button
                      onClick={item.onToggle}
                      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                        item.value ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          item.value ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {item.hint && (
                        <span className="text-xs">{item.hint}</span>
                      )}
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full bg-red-50 border border-red-100 rounded-2xl py-4 text-red-500 font-semibold text-sm transition-all active:scale-95">
          Sign Out
        </button>
        <p className="text-center text-xs text-muted-foreground pb-2">
          ChowWallet v2.1.0
        </p>
      </div>
    </div>
);
}

