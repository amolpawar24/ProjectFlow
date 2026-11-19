
import { useState } from "react";
import { FolderPlus } from "lucide-react";
import type { FormEvent } from "react";

import type {
  Project,
  ProjectFormData,
  ProjectStatus,
} from "../../../types/project.types";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  project?: Project | null;
}

const initialFormData: ProjectFormData = {
  name: "",
  description: "",
  status: "Planning",
  startDate: "",
  dueDate: "",
};

const ProjectForm = ({
  isOpen,
  onClose,
  onSubmit,
  project,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>(() => {
    if (!project) return initialFormData;

    return {
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: project.startDate,
      dueDate: project.dueDate,
    };
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData, string>>
  >({});

  const isEditing = Boolean(project);

  // Handle input changes
  const handleChange = (
    field: keyof ProjectFormData,
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
      Record<keyof ProjectFormData, string>
    > = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name =
        "Project name must contain at least 3 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Project description is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    } else if (
      formData.startDate &&
      formData.dueDate < formData.startDate
    ) {
      newErrors.dueDate =
        "Due date cannot be before the start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit project form
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Project" : "Create New Project"}
      size="lg"
      footer={
        <div className="project-form__footer">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="project-form"
          >
            {isEditing ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      }
    >
      <form
        id="project-form"
        className="project-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Project Name */}
        <div className="project-form__field">
          <Input
            label="Project Name"
            placeholder="Enter project name"
            value={formData.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            error={errors.name}
            required
          />
        </div>

        {/* Description */}
        <div className="project-form__field">
          <label
            htmlFor="project-description"
            className="project-form__label"
          >
            Description
          </label>

          <textarea
            id="project-description"
            className={`project-form__textarea ${
              errors.description
                ? "project-form__textarea--error"
                : ""
            }`}
            placeholder="Describe your project..."
            rows={4}
            value={formData.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
          />

          {errors.description && (
            <span className="project-form__error">
              {errors.description}
            </span>
          )}
        </div>

        {/* Project Status */}
        <div className="project-form__field">
          <label
            htmlFor="project-status"
            className="project-form__label"
          >
            Project Status
          </label>

          <select
            id="project-status"
            className="project-form__select"
            value={formData.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value as ProjectStatus
              )
            }
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        {/* Project Dates */}
        <div className="project-form__date-grid">
          <div className="project-form__field">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(event) =>
                handleChange("startDate", event.target.value)
              }
              error={errors.startDate}
              max={formData.dueDate || undefined}
              required
            />
          </div>

          <div className="project-form__field">
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                handleChange("dueDate", event.target.value)
              }
              error={errors.dueDate}
              min={formData.startDate || undefined}
              required
            />
          </div>
        </div>

        {/* Form Hint */}
        <div className="project-form__hint">
          <FolderPlus size={16} />

          <span>
            You can manage tasks and track progress after
            creating your project.
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectForm;
