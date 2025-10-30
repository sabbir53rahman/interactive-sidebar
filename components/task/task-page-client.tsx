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
  searchParams?: { tab?: string }; // receive from server
}

export default function TasksListClient({
  tasks: initialTasks,
  initialTab,
  searchParams,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
                name: data.instructions, // map instructions → name
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

  return (
    <>
      <Link
        href="/"
        className="md:hidden flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Back</span>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-gray-400 text-sm mt-1">
            Your routines, supercharged. Set up Tasks to deliver the right
            content at the right time.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="p-2 rounded-md hover:bg-[#222] transition"
        >
          <Plus size={22} />
        </button>
      </div>

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

      {activeTab === "Scheduled" && (
        <div className="space-y-2 mt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openModal(task)}
              className="flex justify-between items-center py-2 border-b border-[#222] cursor-pointer hover:bg-[#151515] transition"
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

      {activeTab === "Alerts" && (
        <div className="text-sm text-gray-500 text-center mt-4">
          No alerts available.
        </div>
      )}

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
