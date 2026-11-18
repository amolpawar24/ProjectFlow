
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import type { Project } from "../../../types/project.types";
import type { Task } from "../../../types/task.types";

interface OverviewCardsProps {
  projects: Project[];
  tasks: Task[];
}

const OverviewCards = ({
  projects,
  tasks,
}: OverviewCardsProps) => {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const statistics = [
    {
      id: "projects",
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "primary",
      description: "Projects in your workspace",
    },
    {
      id: "tasks",
      label: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      color: "info",
      description: "Tasks across all projects",
    },
    {
      id: "completed",
      label: "Completed Tasks",
      value: completedTasks,
      icon: CheckCircle2,
      color: "success",
      description: "Successfully completed",
    },
    {
      id: "pending",
      label: "Pending Tasks",
      value: pendingTasks,
      icon: Clock3,
      color: "warning",
      description: "Tasks waiting to start",
    },
  ];

  return (
    <div className="overview-grid">
      {statistics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`overview-card overview-card--${item.color}`}
          >
            <div className="overview-card__top">
              <div className="overview-card__icon">
                <Icon size={22} strokeWidth={1.8} />
              </div>
            </div>

            <div className="overview-card__content">
              <p className="overview-card__label">
                {item.label}
              </p>

              <h3 className="overview-card__value">
                {item.value}
              </h3>

              <span className="overview-card__description">
                {item.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
