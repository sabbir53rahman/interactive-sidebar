"use client";

import { useState } from "react";
import { Plus, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateTaskModal } from "@/components/create-task-modal";
import { Task } from "@/app/account/tasks/page";

interface Props {
  tasks: Task[];
  initialTab: string;
  searchParams?: { tab?: string };
}

export default function TasksListClient({
  tasks: initialTasks,
  initialTab,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [query, setQuery] = useState(""); // <-- added for input field
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabQuery = tab === "Scheduled" ? "scheduled" : "alert";
    router.replace(`/account/tasks?tab=${tabQuery}`);
  };

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setShowModal(true);
  };

  const handleSaveTask = (data: any) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                name: data.instructions,
                schedule: data.schedule,
                date: data.date,
                time: data.time,
                platform: data.platform,
              }
            : t
        )
      );
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        name: data.instructions,
        schedule: data.schedule,
        date: data.date,
        time: data.time,
        platform: data.platform,
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = () => {
    if (!editingTask) return;
    setTasks(tasks.filter((t) => t.id !== editingTask.id));
    setShowModal(false);
    setEditingTask(null);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Add your custom logic here, e.g. open modal or process query
    console.log("Automation query:", query);
    setQuery("");
  };

  return (
    <>
      {/* Back Button */}
      <Link
        href="/"
        className="md:hidden flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Back</span>
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className=" text-white">Tasks</h1>
          <p className="text-gray-400 text-xs mt-1">
            Your routines, supercharged. Set up Tasks to deliver the right
            content at the right time.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="p-2 rounded-md hover:bg-[#222] border border-[#333535] transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Input Field */}
      <form onSubmit={handleInputSubmit} className="relative mt-4 mb-6">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you want to automate..."
          className="w-full h-[120px] resize-none bg-[#1F2121] border border-[#333535] text-gray-200 text-sm rounded-xl px-4 py-3 pr-14 focus:outline-none "
        />

        {/* Arrow Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className={`absolute bottom-5 right-3 h-8 w-8 flex items-center justify-center rounded-full transition ${
            query.trim()
              ? "bg-[#2D9AA5] hover:bg-[#36a7da] cursor-pointer"
              : "bg-[#2D9AA5] cursor-not-allowed opacity-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </form>

      {/* Tabs */}
      <div className="flex border-b border-[#222]">
        {["Scheduled", "Alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-2 text-sm font-medium ${
              activeTab === tab
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-gray-200"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      {activeTab === "Scheduled" && (
        <div className="space-y-2 mt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openModal(task)}
              className="flex justify-between items-center py-1 px-2 rounded-lg border-b border-[#222] cursor-pointer hover:bg-[#252928] transition"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-200">{task.name}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{task.schedule}</p>
                <p className="text-xs text-gray-500">
                  {task.date}, {task.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts */}
      {activeTab === "Alerts" && (
        <div className="text-sm text-gray-500 text-center mt-4">
          No alerts available.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          onDelete={editingTask ? handleDeleteTask : undefined}
          defaultData={editingTask || undefined}
        />
      )}
    </>
  );
}
