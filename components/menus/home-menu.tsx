import { Plane, BookOpen, Dumbbell, PlusCircle } from "lucide-react";

export function HomeMenu() {
  const categories = [
    { icon: <Plane size={16} />, label: "Travel" },
    { icon: <BookOpen size={16} />, label: "Academic" },
    { icon: <Dumbbell size={16} />, label: "Sports" },
  ];

  return (
    <div className="px-4 py-3 space-y-3">
      {/* Categories Section */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Categories
        </p>
        <div>
          {categories.map((item, index) => (
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

      {/* Library Section */}
      <div className="pt-2 border-t border-[#333]">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Library
        </p>
        <button className="w-full text-left px-3 py-1 text-sm text-gray-400 hover:text-cyan-400 hover:bg-[#2A2E2D] rounded transition-colors flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Create a Thread</span>
        </button>
      </div>
    </div>
  );
}
