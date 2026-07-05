function FeaturedCard({
  vendor,
  cart,
  onAddToCart,
  expanded,
  onToggle,
}: {
  vendor: Vendor;
  cart: Record<number, number>;
  onAddToCart: (id: number) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm mb-3">
      <div
        className="relative h-44 cursor-pointer"
        onClick={onToggle}
      >
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className="text-white text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
          >
            ⭐ Featured
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight">{vendor.name}</h3>
          <p className="text-white/80 text-xs mt-0.5">{vendor.cuisine}</p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-foreground">{vendor.rating}</span>
          </span>
          <span>·</span>
          <span>{vendor.deliveryTime}</span>
          <span>·</span>
          <span>Min ₵{vendor.minOrder}</span>
        </div>
        <button
          onClick={onToggle}
          className="text-primary text-xs font-semibold flex items-center gap-1"
        >
          {expanded ? "Close" : "See Menu"} <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </div>
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          {vendor.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{item.name}</p>
                <p className="text-primary font-bold text-sm">₵{item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => onAddToCart(item.id)}
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center transition-all active:scale-90 relative"
                style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
              >
                <Plus className="w-4 h-4" />
                {cart[item.id] > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-bold">
                    {cart[item.id]}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VendorCard({
  vendor,
  cart,
  onAddToCart,
  expanded,
  onToggle,
}: {
  vendor: Vendor;
  cart: Record<number, number>;
  onAddToCart: (id: number) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="flex gap-3 p-3 cursor-pointer" onClick={onToggle}>
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
          <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground text-sm leading-tight">{vendor.name}</h3>
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </div>
          <p className="text-muted-foreground text-xs mt-0.5 mb-2">{vendor.cuisine}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-foreground">{vendor.rating}</span>
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{vendor.deliveryTime}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {vendor.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          {vendor.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{item.name}</p>
                <p className="text-primary font-bold text-sm">₵{item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => onAddToCart(item.id)}
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center transition-all active:scale-90 relative"
                style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
              >
                <Plus className="w-4 h-4" />
                {cart[item.id] > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-bold">
                    {cart[item.id]}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




