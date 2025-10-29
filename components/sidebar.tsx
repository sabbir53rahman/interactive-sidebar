"use client";

import { useState } from "react";
import {
  Home,
  Compass,
  Grid,
  Wallet,
  Plus,
  LogOut,
  Pin,
  Bell,
  User,
  ArrowUp,
  Download,
  Menu,
  X,
} from "lucide-react";
import { HomeMenu } from "./menus/home-menu";
import { DiscoverMenu } from "./menus/discover-menu";
import { FinanceMenu } from "./menus/finance-menu";
import { AccountModal } from "./account-modal";

export function Sidebar() {
  const [pinned, setPinned] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredBottomIcon, setHoveredBottomIcon] = useState<string | null>(
    null
  );
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountModalPosition, setAccountModalPosition] = useState({
    top: 0,
    left: 0,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const expanded = isHovering || pinned;

  const handleContainerMouseEnter = (menu: string) => {
    setActiveMenu(menu);
    setIsHovering(true);
  };

  const handleContainerMouseLeave = () => {
    setIsHovering(false);
    if (!pinned) setActiveMenu(null);
  };

  const togglePin = () => setPinned(!pinned);

  const handleAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAccountModalPosition({
      top: rect.top - 530,
      left: rect.left - 300 + 300,
    });
    setShowAccountModal(true);
  };

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "discover", icon: Compass, label: "Discover" },
    { id: "spaces", icon: Grid, label: "Spaces" },
    { id: "finance", icon: Wallet, label: "Finance" },
  ];

  const bottomItems = [
    { id: "notification", icon: Bell, label: "Notification" },
    { id: "account", icon: User, label: "Account" },
    { id: "upgrade", icon: ArrowUp, label: "Upgrade" },
    { id: "install", icon: Download, label: "Install" },
  ];

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-start bg-[#1a1a1a] text-white px-4 py-3">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="text-lg font-semibold">perplexity</h1>
        <div className="w-6" /> {/* Spacer for balance */}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex h-screen bg-[#1a1a1a]">
        <div className="flex" onMouseLeave={handleContainerMouseLeave}>
          {/* Collapsed Sidebar */}
          <div className="w-20 bg-[#1f1f1f] flex items-center justify-center flex-col">
            {/* Logo */}
            <div className="flex items-center justify-center p-4 ">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0">
                <span className="text-[#1f1f1f] font-bold text-sm">P</span>
              </div>
            </div>

            {/* Add Button */}
            <div className="p-4  relative group">
              <button
                className=" flex items-center justify-center p-2 hover:bg-[#333] rounded transition-colors"
                onMouseEnter={() => setHoveredBottomIcon("add")}
                onMouseLeave={() => setHoveredBottomIcon(null)}
              >
                <Plus size={24} className="text-gray-400" />
              </button>
              {hoveredBottomIcon === "add" && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#2a2a2a] text-white px-3 py-1 rounded text-sm border border-[#444] animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap">
                  New Thread
                </div>
              )}
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <>
                    <button
                      key={item.id}
                      onMouseEnter={() => handleContainerMouseEnter(item.id)}
                      className={` flex items-center text-sm justify-center p-3 rounded-lg transition-colors ${
                        isActive ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={isActive ? "text-cyan-400" : "text-gray-400"}
                      />
                    </button>
                    <p className="text-center text-[11px] text-[#929591]">
                      {item.label}
                    </p>
                  </>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="space-y-2">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredBottomIcon === item.id;
                const showHoverCard =
                  item.id === "install" || item.id === "notification";

                return (
                  <div key={item.id} className="relative">
                    <button
                      className={`flex items-center justify-center p-2 rounded-full transition-colors ${
                        isHovered ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
                      }`}
                      onMouseEnter={() => setHoveredBottomIcon(item.id)}
                      onMouseLeave={() => setHoveredBottomIcon(null)}
                      onClick={(e) =>
                        item.id === "account" && handleAccountClick(e)
                      }
                    >
                      {item.id === "account" ? (
                        <div className="w-6 h-6 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          S
                        </div>
                      ) : (
                        <Icon size={24} className="text-gray-400" />
                      )}
                    </button>
                    {isHovered && showHoverCard && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#2a2a2a] text-white px-3 py-1 rounded text-sm border border-[#444] animate-in fade-in slide-in-from-left-2 duration-200">
                        {item.id === "notification"
                          ? "Notifications"
                          : "Download"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sign Out */}
            <div className="p-4">
              <button className="w-full flex items-center justify-center p-3 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors">
                <LogOut size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Expanded Sidebar */}
          <div
            className={`bg-[#1F2121] border-r border-[#333] flex flex-col overflow-hidden transition-all duration-300 ease-out ${
              expanded ? "opacity-100" : "w-0 opacity-0"
            } ${pinned ? "w-72" : "w-64"}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#333]">
              <h2 className="text-white font-medium text-sm whitespace-nowrap">
                {activeMenu === "home" && "Home"}
                {activeMenu === "discover" && "Discover"}
                {activeMenu === "spaces" && "Spaces"}
                {activeMenu === "finance" && "Finance"}
              </h2>
              <button
                onClick={togglePin}
                className="p-1 hover:bg-[#333] rounded transition-colors"
              >
                <Pin
                  size={16}
                  className={
                    pinned ? "text-cyan-400 fill-cyan-400" : "text-gray-500"
                  }
                />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto transition-opacity duration-300">
              {activeMenu === "home" && <HomeMenu />}
              {activeMenu === "discover" && <DiscoverMenu />}
              {activeMenu === "spaces" && (
                <div className="px-4 py-3">
                  <p className="text-gray-400 text-sm">Spaces content</p>
                </div>
              )}
              {activeMenu === "finance" && <FinanceMenu />}
            </div>
          </div>
        </div>

        {showAccountModal && (
          <AccountModal
            onClose={() => setShowAccountModal(false)}
            position={accountModalPosition}
          />
        )}
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-[#1a1a1a] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <X size={28} className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="text-left text-white py-3 px-4 rounded hover:bg-[#333] transition"
              onClick={() => {
                setActiveMenu(item.id);
                setMobileOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center gap-2">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
