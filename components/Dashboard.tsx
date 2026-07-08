import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Plus,
  Utensils,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { TRANSACTIONS } from "./data/transactions";


export default function Dashboard({
  balance,
  onOrder,
  onTopUp,
}: {
  balance: number;
  onOrder: () => void;
  onTopUp: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 16,
        }}
      >
        <View>
          <Text style={{}} className="text-muted-foreground text-sm font-medium">
            Good afternoon,
          </Text>
          <Text className="text-xl font-bold text-foreground">
            Kwame Asante 👋
          </Text>
        </View>
        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#00000000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell className="w-5 h-5 text-foreground" />
          <View
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#00000000",
            }}
          />
        </Pressable>
      </View>


      {/* Wallet Card */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <View
          style={{
            borderRadius: 16,
            padding: 24,
            overflow: "hidden",
            backgroundColor: "#212121",
          }}
        >
          {/* Decorative circles */}
          <View
            style={{
              position: "absolute",
              top: -32,
              right: -32,
              width: 144,
              height: 144,
              borderRadius: 72,
              opacity: 0.1,
              backgroundColor: "#FF9800",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -40,
              left: -24,
              width: 112,
              height: 112,
              borderRadius: 56,
              opacity: 0.1,
              backgroundColor: "#FF5722",
            }}
          />

          <View style={{ position: "relative" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FF9800",
                  }}
                >
                  <Text className="text-sm font-bold">C</Text>
                </View>
                <Text className="text-white/70 text-sm font-medium" style={{ marginLeft: 8 }}>
                  ChowWallet
                </Text>
              </View>
              <Text className="text-white/40 text-xs tracking-widest font-mono">
                •••• 4821
              </Text>
            </View>

            <Text className="text-white/60 text-xs font-medium uppercase tracking-widest" style={{ marginBottom: 6 }}>
              Current Balance
            </Text>
            <Text className="text-white text-4xl font-bold tracking-tight">
              ₵{balance.toFixed(2)}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 24,
              }}
            >
              <View>
                <Text className="text-white/40 text-xs uppercase tracking-wide">
                  Card Holder
                </Text>
                <Text className="text-white text-sm font-semibold" style={{ marginTop: 2 }}>
                  Kwame Asante
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#FF9800", opacity: 0.8 }} />
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#FF5722", opacity: 0.8, marginLeft: -12 }} />
              </View>
            </View>
          </View>
        </View>
      </View>


      {/* Quick Actions */}
      <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            onPress={onTopUp}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#FF9800",
              borderRadius: 16,
              padding: 16,
              marginRight: 12,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Plus className="w-5 h-5" />
            </View>
            <Text className="text-white font-semibold text-sm" style={{ lineHeight: 16 }}>
              Top Up
              {"\n"}
              Wallet
            </Text>
          </Pressable>

          <Pressable
            onPress={onOrder}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#FF9800",
              borderRadius: 16,
              padding: 16,
              marginLeft: 12,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Utensils className="w-5 h-5" />
            </View>
            <Text className="text-white font-semibold text-sm" style={{ lineHeight: 16 }}>
              Order
              {"\n"}
              Food
            </Text>
          </Pressable>
        </View>
      </View>


      {/* Stats row */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[
            { label: "Spent Today", value: "₵25.00", color: "#EF4444" },
            { label: "This Week", value: "₵55.50", color: "#FF9800" },
            { label: "Orders", value: "12", color: "#10B981" },
          ].map(({ label, value, color }) => (
            <View
              key={label}
              style={{
                flex: 1,
                backgroundColor: "#00000000",
                borderRadius: 16,
                padding: 12,
                alignItems: "center",
                marginHorizontal: 4,
              }}
            >
              <Text className="font-bold text-base" style={{ color }}>
                {value}
              </Text>
              <Text className="text-muted-foreground text-xs" style={{ marginTop: 2 }}>
                {label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text className="font-bold text-foreground text-base">
            Recent Transactions
          </Text>
          <Pressable>
            <Text className="text-primary text-sm font-medium" style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>See all </Text>
              <ChevronRight className="w-3.5 h-3.5" />
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: 12 }}>
          {TRANSACTIONS.map((tx) => (
            <View
              key={tx.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                backgroundColor: "#00000000",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  backgroundColor: "#00000000",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {tx.icon}
              </View>
              <View style={{ flex: 1 }}>
                <Text className="font-semibold text-foreground text-sm" numberOfLines={1}>
                  {tx.vendor}
                </Text>
                <Text className="text-muted-foreground text-xs" style={{ marginTop: 2 }}>
                  {tx.time}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                {tx.type === "debit" ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-green-500" />
                )}
                <Text
                  className="font-bold text-sm"
                  style={{ color: tx.type === "debit" ? "#EF4444" : "#10B981" }}
                >
                  {tx.type === "debit" ? "-" : "+"}₵{tx.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 16 }} />
    </View>
  );
}

