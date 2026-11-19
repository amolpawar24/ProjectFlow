
import {
  CalendarDays,
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Project } from "../../../types/project.types";

import Badge from "../../../components/common/Badge";

import { formatDate, isOverdue } from "../../../utils/dateUtils";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const getStatusVariant = (
    status: Project["status"]
  ): "primary" | "success" | "warning" | "neutral" => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "primary";
      case "Planning":
        return "warning";
      case "On Hold":
        return "neutral";
      default:
        return "neutral";
    }
  };

  const overdue =
    project.status !== "Completed" && isOverdue(project.dueDate);

  const progress = Math.min(
    100,
    Math.max(0, project.progress)
  );

  return (
    <article className="project-card">
      {/* Card Header */}
      <div className="project-card__header">
        <div className="project-card__icon">
          <FolderKanban size={22} />
        </div>

        <div className="project-card__actions">
          <button
            type="button"
            className="project-card__action project-card__action--edit"
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name}`}
            title="Edit project"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="project-card__action project-card__action--delete"
            onClick={() => onDelete(project.id)}
            aria-label={`Delete ${project.name}`}
            title="Delete project"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Project Information */}
      <div className="project-card__content">
        <div className="project-card__title-row">
          <h3 className="project-card__title">
            {project.name}
          </h3>

          <Badge variant={getStatusVariant(project.status)}>
            {project.status}
          </Badge>
        </div>

        <p className="project-card__description">
          {project.description || "No project description available."}
        </p>
      </div>

      {/* Project Progress */}
      <div className="project-card__progress">
        <div className="project-card__progress-header">
          <span>Project Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div
          className="project-card__progress-track"
          role="progressbar"
          aria-label={`${project.name} progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="project-card__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="project-card__footer">
        <div
          className={`project-card__due-date ${
            overdue ? "project-card__due-date--overdue" : ""
          }`}
        >
          <CalendarDays size={15} />

          <span>
            {overdue ? "Overdue: " : "Due: "}
            {formatDate(project.dueDate)}
          </span>
        </div>

        {overdue && (
          <Badge variant="danger">
            Overdue
          </Badge>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
