import { BarChart3, Bitcoin, TrendingUp, Search } from "lucide-react";

export function FinanceMenu() {
  const markets = [
    { icon: <BarChart3 size={16} />, label: "US Markets" },
    { icon: <Bitcoin size={16} />, label: "Crypto" },
    { icon: <TrendingUp size={16} />, label: "Earnings" },
    { icon: <Search size={16} />, label: "Screener" },
  ];

  return (
    <div className="px-4 py-3 space-y-3">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Markets
        </p>
        <div>
          {markets.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-[#2A2E2D] rounded transition-colors flex items-center gap-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
