import {
  Star,
  Microscope,
  DollarSign,
  Palette,
  Trophy,
  Film,
} from "lucide-react";

export function DiscoverMenu() {
  const topics = [
    { icon: <Star size={16} />, label: "Top" },
    { icon: <Microscope size={16} />, label: "Tech & Science" },
    { icon: <DollarSign size={16} />, label: "Finance" },
    { icon: <Palette size={16} />, label: "Arts & Culture" },
    { icon: <Trophy size={16} />, label: "Sports" },
    { icon: <Film size={16} />, label: "Entertainment" },
  ];

  return (
    <div className="px-4 py-3 space-y-3">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Topics
        </p>
        <div>
          {topics.map((topic, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-[#2A2E2D] rounded transition-colors flex items-center gap-2"
            >
              {topic.icon}
              <span>{topic.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
