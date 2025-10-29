"use client";

import {
  Check,
  Circle,
  Settings,
  Bell,
  Users,
  Code,
  Crown,
  Sliders,
  Eye,
  User,
  BarChart3,
  Zap,
  BookOpen,
} from "lucide-react";

interface AccountModalProps {
  onClose: () => void;
  position?: { top: number; left: number };
}

export function AccountModal({ onClose, position }: AccountModalProps) {
  const menuItems = [
    { label: "Account", icon: User },
    { label: "Preferences", icon: Sliders },
    { label: "Personalization", icon: Zap },
    { label: "Assistant", icon: BookOpen },
    { label: "Tasks", icon: BarChart3, hasIndicator: true },
    { label: "Notifications", icon: Bell },
    { label: "Connectors", icon: Users },
    { label: "API", icon: Code },
    { label: "Pro Perks", icon: Crown },
    { label: "All settings", icon: Settings },
    { label: "View plans", icon: Eye },
  ];

  const users = [
    { name: "hello53ra72280", avatar: "S", isActive: true },
    { name: "Incognito", avatar: "🥸", isActive: false },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed bg-[#191A1A] border border-[#444] rounded-lg w-56 flex flex-col z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
        style={{
          top: position?.top || 0,
          left: position?.left || 0,
        }}
      >
        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#1F2121] rounded transition-colors text-left group"
              >
                <Icon size={18} className="text-gray-400 shrink-0" />
                <span className="text-gray-300 text-[13px] flex-1">
                  {item.label}
                </span>
                {item.hasIndicator && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full shrink-0"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#444] my-2"></div>

        {/* User Profiles */}
        <div className="p-2">
          {users.map((user, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#333] rounded transition-colors text-left"
            >
              <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.avatar}
              </div>
              <span className="text-gray-300 text-sm flex-1">{user.name}</span>
              {user.isActive ? (
                <Check size={16} className="text-cyan-400 shrink-0" />
              ) : (
                <Circle size={16} className="text-gray-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
