import { useState } from "react";
import {Search,Flame,Leaf,ShoppingCart} from "lucide-react-native";

import { VENDORS } from "./data/vendors";
import { CATEGORIES } from "./data/categories";

import { FeaturedCard, VendorCard } from "./VendorCard";



export default function Marketplace({
  cart,
  cartTotal,
  cartCount,
  onAddToCart,
}: {
  cart: Record<number, number>;
  cartTotal: number;
  cartCount: number;
  onAddToCart: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null);

  const filtered = VENDORS.filter((v) => {
    const matchSearch =
      !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" || v.tags.some((t) => t === activeCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-0.5">Order Food 🍽️</h1>
        <p className="text-muted-foreground text-sm">Find your favourite local vendors</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for Waakye or Jollof..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-5">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold flex-shrink-0 transition-all ${
                activeCategory === cat
                  ? "text-white"
                  : "bg-card border border-border text-muted-foreground"
              }`}
              style={
                activeCategory === cat
                  ? { background: "linear-gradient(135deg, #FF9800, #FF5722)" }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {activeCategory === "All" && !search && (
        <div className="mb-6">
          <div className="flex items-center gap-2 px-5 mb-3">
            <Flame className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">Featured</h2>
          </div>
          <div className="px-5">
            {VENDORS.filter((v) => v.featured).map((vendor) => (
              <FeaturedCard
                key={vendor.id}
                vendor={vendor}
                cart={cart}
                onAddToCart={onAddToCart}
                expanded={expandedVendor === vendor.id}
                onToggle={() =>
                  setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* All Vendors */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-3">
          <Leaf className="w-4 h-4 text-green-500" />
          <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">
            {activeCategory === "All" ? "All Vendors" : activeCategory}
          </h2>
        </div>
        <div className="space-y-3">
          {filtered.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              cart={cart}
              onAddToCart={onAddToCart}
              expanded={expandedVendor === vendor.id}
              onToggle={() =>
                setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)
              }
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No vendors found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Cart Bar */}
      <div className="fixed bottom-16 left-0 right-0 px-5 z-20" style={{ maxWidth: 430, margin: "0 auto", left: 0, right: 0 }}>
        <button
          className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-between px-5 shadow-xl transition-all active:scale-95"
          style={{ background: cartCount > 0 ? "linear-gradient(135deg, #FF9800, #FF5722)" : "#888" }}
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "Cart"}
          </span>
          <span>₵{cartTotal.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
