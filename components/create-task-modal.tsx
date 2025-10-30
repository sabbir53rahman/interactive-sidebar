"use client";

import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";

interface CreateTaskModalProps {
  onClose: () => void;
  onSave: (data: {
    instructions: string;
    schedule: string;
    date: string;
    time: string;
    platform: string;
  }) => void;
  onDelete?: () => void;
  defaultData?: {
    instructions?: string;
    schedule?: string;
    date?: string;
    time?: string;
    platform?: string;
  };
}

export function CreateTaskModal({
  onClose,
  onSave,
  onDelete,
  defaultData,
}: CreateTaskModalProps) {
  const [instructions, setInstructions] = useState(
    defaultData?.instructions || ""
  );
  const [schedule, setSchedule] = useState(defaultData?.schedule || "Once");
  const [date, setDate] = useState(
    defaultData?.date
      ? new Date(defaultData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState(defaultData?.time || "12:00");
  const [platform, setPlatform] = useState(
    defaultData?.platform || "In-app, Email, and Mobile"
  );

  // Reset state when defaultData changes (for editing a different task)
  useEffect(() => {
    setInstructions(defaultData?.instructions || "");
    setSchedule(defaultData?.schedule || "Once");
    setDate(
      defaultData?.date
        ? new Date(defaultData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setTime(defaultData?.time || "12:00");
    setPlatform(defaultData?.platform || "In-app, Email, and Mobile");
  }, [defaultData]);

  const handleSave = () => {
    if (!instructions.trim()) {
      alert("Please enter some instructions!");
      return;
    }

    onSave({
      instructions,
      schedule,
      date,
      time,
      platform,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
        <div className="bg-[#191A1A] border border-[#444] rounded-lg w-full max-w-md p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">Scheduled Task</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe what you want to automate"
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none h-24"
            />
          </div>

          {/* Schedule, Date, Time */}
          <div className="mb-6 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Schedule
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option>Once</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-3 py-1 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Notification Platform */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Notification platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option>In-app, Email, and Mobile</option>
              <option>In-app only</option>
              <option>Email only</option>
              <option>Mobile only</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-end">
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-4 py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
