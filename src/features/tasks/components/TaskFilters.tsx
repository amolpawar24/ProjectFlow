
import { Search, SlidersHorizontal } from "lucide-react";

import type {
  TaskPriority,
  TaskStatus,
} from "../../../types/task.types";

export interface TaskFiltersValue {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
}

interface TaskFiltersProps {
  filters: TaskFiltersValue;
  onChange: (filters: TaskFiltersValue) => void;
}

const TaskFilters = ({ filters, onChange }: TaskFiltersProps) => {
  const handleChange = (
    field: keyof TaskFiltersValue,
    value: string
  ) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="task-filters">
      <div className="task-filters__search">
        <Search size={18} aria-hidden="true" />

        <input
          type="search"
          placeholder="Search tasks by title..."
          value={filters.search}
          onChange={(event) =>
            handleChange("search", event.target.value)
          }
          aria-label="Search tasks by title"
        />
      </div>

      <div className="task-filters__controls">
        <div className="task-filters__select-wrapper">
          <SlidersHorizontal size={16} aria-hidden="true" />

          <select
            value={filters.status}
            onChange={(event) =>
              handleChange("status", event.target.value)
            }
            aria-label="Filter tasks by status"
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="task-filters__select-wrapper">
          <select
            value={filters.priority}
            onChange={(event) =>
              handleChange("priority", event.target.value)
            }
            aria-label="Filter tasks by priority"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
