"use client";

import { useState } from "react";
import { Plus, Clock, ArrowLeft } from "lucide-react";
import { CreateTaskModal } from "@/components/create-task-modal";
import Link from "next/link";

interface Task {
  id: string;
  name: string;
  schedule: string;
  date: string;
  time: string;
  platform?: string;
}

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("Scheduled");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "hshshshshsh",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:46 PM",
      platform: "In-app, Email, and Mobile",
    },
    {
      id: "2",
      name: "jsjsjsjs",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:40 PM",
      platform: "In-app only",
    },
    {
      id: "3",
      name: "jjj",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:40 PM",
      platform: "Email only",
    },
  ]);

  // Handle new or updated task
  const handleSaveTask = (data: any) => {
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id
          ? {
              ...t,
              name: data.instructions,
              schedule: data.schedule,
              date: new Date(data.date).toDateString(),
              time: data.time,
              platform: data.platform,
            }
          : t
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now().toString(),
        name: data.instructions || "New Task",
        schedule: data.schedule || "Once",
        date: new Date(data.date).toDateString(),
        time: data.time,
        platform: data.platform,
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  // Handle delete
  const handleDeleteTask = () => {
    if (!editingTask) return;
    const updatedTasks = tasks.filter((t) => t.id !== editingTask.id);
    setTasks(updatedTasks);
    setShowModal(false);
    setEditingTask(null);
  };

  // Open modal for new or existing task
  const openModal = (task?: Task) => {
    if (task) setEditingTask(task);
    else setEditingTask(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-4 py-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Back button (Mobile only) */}
        <Link
          href="/"
          className="md:hidden flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </Link>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <p className="text-gray-400 text-sm mt-1">
              Your routines, supercharged. Set up Tasks to deliver the right
              content at the right time, automatically.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="p-2 rounded-md hover:bg-[#222] transition"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Input box */}
        <div className="relative bg-[#151515] border border-[#222] rounded-lg px-4 py-3 flex items-center">
          <input
            type="text"
            placeholder="Describe what you want to automate"
            className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
          />
          <button className="p-2 rounded-full hover:bg-[#222] transition">
            <Plus size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#222]">
          {["Scheduled", "Alerts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          onDelete={editingTask ? handleDeleteTask : undefined}
          // Pass default data for edit mode
          defaultData={
            editingTask
              ? {
                  instructions: editingTask.name,
                  schedule: editingTask.schedule,
                  date: editingTask.date,
                  time: editingTask.time,
                  platform: editingTask.platform,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
