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

  // Reset state when editing another task
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
    if (!instructions.trim()) return;
    onSave({ instructions, schedule, date, time, platform });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl w-full max-w-xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-100 text-lg font-medium">
              Scheduled task
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#2a2a2a] rounded-md transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-5">
            <label className="block text-sm text-gray-400 mb-2">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe what you want to automate"
              className="w-full h-[90px] bg-[#252928] border border-[#222] text-gray-200 text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#48BEF7] resize-none"
            />
          </div>

          {/* Schedule, Date, Time */}
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Schedule
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full bg-[#252928] border border-[#222] text-gray-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#48BEF7]"
              >
                <option>Once</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#252928] border border-[#222] text-gray-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#48BEF7]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#252928] border border-[#222] text-gray-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#48BEF7]"
              />
            </div>
          </div>

          {/* Notification Platform */}
          <div className="mb-7">
            <label className="block text-sm text-gray-400 mb-2">
              Notification platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#252928] border border-[#222] text-gray-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#48BEF7]"
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
                className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 text-gray-300 bg-[#2a2a2a] rounded-md hover:bg-[#333] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!instructions.trim()}
              className={`px-5 py-2 rounded-md font-medium transition-colors ${
                instructions.trim()
                  ? "bg-[#48BEF7] text-black hover:bg-[#3da9db]"
                  : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
