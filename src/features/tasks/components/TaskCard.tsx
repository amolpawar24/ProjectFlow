
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Task } from "../../../types/task.types";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";

import { formatDate, isOverdue } from "../../../utils/dateUtils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const priorityVariant = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  } as const;

  const statusVariant = {
    "To Do": "neutral",
    "In Progress": "info",
    Completed: "success",
  } as const;

  const overdue =
    task.status !== "Completed" && isOverdue(task.dueDate);

  const StatusIcon =
    task.status === "Completed"
      ? CheckCircle2
      : task.status === "In Progress"
        ? Clock3
        : Circle;

  return (
    <article className="task-card">
      {/* Card Header */}
      <div className="task-card__header">
        <div className="task-card__badges">
          <Badge variant={statusVariant[task.status]}>
            <StatusIcon size={13} />
            {task.status}
          </Badge>

          <Badge variant={priorityVariant[task.priority]}>
            {task.priority} Priority
          </Badge>
        </div>

        <div className="task-card__actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="task-card__content">
        <h3 className="task-card__title">
          {task.title}
        </h3>

        <p className="task-card__description">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Card Footer */}
      <div className="task-card__footer">
        <div
          className={`task-card__due-date ${
            overdue ? "task-card__due-date--overdue" : ""
          }`}
        >
          <CalendarDays size={15} />

          <span>
            {overdue ? "Overdue: " : "Due: "}
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
