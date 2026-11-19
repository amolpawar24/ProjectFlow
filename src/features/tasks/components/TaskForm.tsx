
import { useState } from "react";
import { ListPlus } from "lucide-react";
import type { FormEvent } from "react";

import type { Project } from "../../../types/project.types";

import type {
  Task,
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from "../../../types/task.types";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  projects: Project[];
  task?: Task | null;
}

const initialFormData: TaskFormData = {
  projectId: "",
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({
  isOpen,
  onClose,
  onSubmit,
  projects,
  task,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    if (!task) {
      return {
        ...initialFormData,
        projectId: projects[0]?.id ?? "",
      };
    }

    return {
      projectId: task.projectId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    };
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskFormData, string>>
  >({});

  const isEditing = Boolean(task);

  // Handle input changes
  const handleChange = (
    field: keyof TaskFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Partial<
      Record<keyof TaskFormData, string>
    > = {};

    if (!formData.projectId) {
      newErrors.projectId = "Please select a project.";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title =
        "Task title must contain at least 3 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Task description is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit task form
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
      size="lg"
      footer={
        <div className="task-form__footer">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="task-form"
          >
            {isEditing ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      }
    >
      <form
        id="task-form"
        className="task-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Project Selection */}
        <div className="task-form__field">
          <label
            htmlFor="task-project"
            className="task-form__label"
          >
            Select Project
          </label>

          <select
            id="task-project"
            className={`task-form__select ${
              errors.projectId ? "task-form__select--error" : ""
            }`}
            value={formData.projectId}
            onChange={(event) =>
              handleChange("projectId", event.target.value)
            }
          >
            <option value="">Choose a project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {errors.projectId && (
            <span className="task-form__error">
              {errors.projectId}
            </span>
          )}

          {projects.length === 0 && (
            <span className="task-form__hint-text">
              Create a project before adding tasks.
            </span>
          )}
        </div>

        {/* Task Title */}
        <div className="task-form__field">
          <Input
            label="Task Title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(event) =>
              handleChange("title", event.target.value)
            }
            error={errors.title}
            required
          />
        </div>

        {/* Description */}
        <div className="task-form__field">
          <label
            htmlFor="task-description"
            className="task-form__label"
          >
            Description
          </label>

          <textarea
            id="task-description"
            className={`task-form__textarea ${
              errors.description
                ? "task-form__textarea--error"
                : ""
            }`}
            placeholder="Describe your task..."
            rows={4}
            value={formData.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
          />

          {errors.description && (
            <span className="task-form__error">
              {errors.description}
            </span>
          )}
        </div>

        {/* Status and Priority */}
        <div className="task-form__select-grid">
          <div className="task-form__field">
            <label
              htmlFor="task-status"
              className="task-form__label"
            >
              Task Status
            </label>

            <select
              id="task-status"
              className="task-form__select"
              value={formData.status}
              onChange={(event) =>
                handleChange(
                  "status",
                  event.target.value as TaskStatus
                )
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="task-form__field">
            <label
              htmlFor="task-priority"
              className="task-form__label"
            >
              Priority
            </label>

            <select
              id="task-priority"
              className="task-form__select"
              value={formData.priority}
              onChange={(event) =>
                handleChange(
                  "priority",
                  event.target.value as TaskPriority
                )
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="task-form__field">
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(event) =>
              handleChange("dueDate", event.target.value)
            }
            error={errors.dueDate}
            required
          />
        </div>

        {/* Form Hint */}
        <div className="task-form__hint">
          <ListPlus size={16} />

          <span>
            Organize your work by assigning tasks to projects
            and setting priorities.
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
