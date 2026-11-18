
import {
  CalendarDays,
  Pencil,
  Trash2,
  FolderKanban,
} from "lucide-react";

import type { Project } from "../../../types/project.types";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";

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

  const overdue = isOverdue(
    project.dueDate,
    project.status
  );

  return (
    <article className="project-card">
      {/* Card Header */}
      <div className="project-card__header">
        <div className="project-card__icon">
          <FolderKanban size={21} />
        </div>

        <Badge variant={getStatusVariant(project.status)}>
          {project.status}
        </Badge>
      </div>

      {/* Project Information */}
      <div className="project-card__content">
        <h3 className="project-card__title">
          {project.name}
        </h3>

        <p className="project-card__description">
          {project.description}
        </p>
      </div>

      {/* Progress */}
      <div className="project-card__progress">
        <div className="project-card__progress-header">
          <span>Project Progress</span>

          <strong>
            {Math.min(100, Math.max(0, project.progress))}%
          </strong>
        </div>

        <div className="project-card__progress-track">
          <div
            className="project-card__progress-fill"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, project.progress)
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Due Date */}
      <div className="project-card__footer">
        <div className="project-card__due-date">
          <CalendarDays size={16} />

          <span
            className={
              overdue
                ? "project-card__due-date--overdue"
                : ""
            }
          >
            {formatDate(project.dueDate)}
          </span>

          {overdue && (
            <Badge variant="danger">Overdue</Badge>
          )}
        </div>

        {/* Actions */}
        <div className="project-card__actions">
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Edit ${project.name}`}
            title="Edit project"
            onClick={() => onEdit(project)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${project.name}`}
            title="Delete project"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
