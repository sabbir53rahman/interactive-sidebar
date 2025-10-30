import type React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1a1a1a]">
      {/* Account Sidebar */}
      <div className="hidden w-64 bg-[#1f1f1f] border-r border-[#333] md:flex flex-col p-4 overflow-y-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </Link>

        {/* Account Section */}
        <div className="mb-8">
          <h3 className="text-gray-500 text-xs font-semibold uppercase mb-3">
            Account
          </h3>
          <nav className="space-y-1">
            {[
              { label: "Account", href: "/account" },
              { label: "Preferences", href: "/account/preferences" },
              { label: "Personalization", href: "/account/personalization" },
              { label: "Assistant", href: "/account/assistant" },
              { label: "Tasks", href: "/account/tasks" },
              { label: "Notifications", href: "/account/notifications" },
              { label: "Connectors", href: "/account/connectors" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Workspace Section */}
        <div>
          <h3 className="text-gray-500 text-xs font-semibold uppercase mb-3">
            Workspace
          </h3>
          <nav className="space-y-1">
            {[
              { label: "API", href: "/account/api" },
              { label: "Enterprise", href: "/account/enterprise" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
