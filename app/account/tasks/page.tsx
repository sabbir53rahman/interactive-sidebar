import TasksListClient from "@/components/task/task-page-client";

export interface Task {
  id: string;
  name: string;
  schedule: string;
  date: string;
  time: string;
  platform?: string;
}

async function fetchTasks(): Promise<Task[]> {
  return [
    {
      id: "1",
      name: "hello",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:46 PM",
      platform: "In-app, Email, and Mobile",
    },
    {
      id: "2",
      name: "dfhfgfgdh",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:40 PM",
      platform: "In-app only",
    },
    {
      id: "3",
      name: "adsgf",
      schedule: "Once",
      date: "Oct 30, 2025",
      time: "4:40 PM",
      platform: "Email only",
    },
  ];
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const tasks = await fetchTasks();
  const tab = searchParams?.tab === "alert" ? "Alerts" : "Scheduled";

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-4 py-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <TasksListClient tasks={tasks} initialTab={tab} />
      </div>
    </div>
  );
}
