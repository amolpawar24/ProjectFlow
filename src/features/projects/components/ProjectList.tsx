
import { FolderKanban } from "lucide-react";

import type { Project } from "../../../types/project.types";

import ProjectCard from "./ProjectCard";

import EmptyState from "../../../components/common/EmptyState";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectList = ({
  projects,
  onEdit,
  onDelete,
}: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="project-list__empty">
        <EmptyState
          title="No projects found"
          description="Create your first project to start organizing your work."
          icon={<FolderKanban size={32} />}
        />
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProjectList;
