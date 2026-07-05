function TopUpModal({
  onClose,
  onTopUp,
  success,
}: {
  onClose: () => void;
  onTopUp: (amount: number) => void;
  success: boolean;
}) {
  const amounts = [10, 20, 50, 100];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: 430, margin: "0 auto", left: 0, right: 0 }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-t-3xl w-full p-6 z-10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-foreground text-lg">Top Up Wallet</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #FF9800, #FF5722)" }}
            >
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-foreground text-lg">Top Up Successful!</p>
            <p className="text-muted-foreground text-sm mt-1">₵{selected?.toFixed(2)} added to your wallet</p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground text-sm mb-4">Select an amount to add via MoMo</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelected(amt)}
                  className={`rounded-2xl py-4 font-bold text-lg border-2 transition-all ${
                    selected === amt
                      ? "border-primary text-primary"
                      : "border-border text-foreground bg-muted"
                  }`}
                >
                  ₵{amt}
                </button>
              ))}
            </div>
            <button
              onClick={() => selected && onTopUp(selected)}
              disabled={!selected}
              className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:scale-95 disabled:opacity-40"
              style={{ background: selected ? "linear-gradient(135deg, #FF9800, #FF5722)" : "#ccc" }}
            >
              {selected ? `Add ₵${selected} via MoMo` : "Select an amount"}
            </button>
          </>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}