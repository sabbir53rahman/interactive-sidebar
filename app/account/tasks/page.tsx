"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TasksPageClient = dynamic(
  () => import("@/components/task/task-page-client"),
  { ssr: false }
);

export default function TasksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TasksPageClient />
    </Suspense>
  );
}
