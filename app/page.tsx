import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#1a1a1a]">
      <Sidebar />
      <main className="flex-1 bg-[#1a1a1a] text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-400">
          Hover over the sidebar icons to expand. Click the pin icon to keep it
          expanded.
        </p>
      </main>
    </div>
  );
}
