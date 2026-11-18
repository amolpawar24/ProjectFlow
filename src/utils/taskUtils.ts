
import type { Task, TaskPriority, TaskStatus } from "../types/task.types";

export interface TaskFilters {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
}

export const filterTasks = (
  tasks: Task[],
  filters: TaskFilters
): Task[] => {
  return tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "All" ||
      task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};

export const getTaskStatistics = (tasks: Task[]) => {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  return {
    total,
    completed,
    inProgress,
    pending,
    completionRate:
      total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

export const getTasksByProject = (
  tasks: Task[],
  projectId: string
): Task[] => {
  return tasks.filter((task) => task.projectId === projectId);
};

export const getTasksByStatus = (
  tasks: Task[],
  status: TaskStatus
): Task[] => {
  return tasks.filter((task) => task.status === status);
};

export const getTasksByPriority = (
  tasks: Task[],
  priority: TaskPriority
): Task[] => {
  return tasks.filter((task) => task.priority === priority);
};
