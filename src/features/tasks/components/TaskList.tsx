
import { ListTodo } from "lucide-react";

import type { Task } from "../../../types/task.types";

import TaskCard from "./TaskCard";

import EmptyState from "../../../components/common/EmptyState";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <EmptyState
          title="No tasks found"
          description="Create your first task to start organizing your work."
          icon={<ListTodo size={32} />}
        />
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
