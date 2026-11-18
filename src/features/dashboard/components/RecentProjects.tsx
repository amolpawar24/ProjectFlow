
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, FolderKanban } from "lucide-react";

import type { Project } from "../../../types/project.types";
import Badge from "../../../components/common/Badge";
import EmptyState from "../../../components/common/EmptyState";
import { formatDate } from "../../../utils/dateUtils";

interface RecentProjectsProps {
  projects: Project[];
}

const RecentProjects = ({ projects }: RecentProjectsProps) => {
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
    .slice(0, 4);

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

  return (
    <section className="recent-projects">
      <div className="recent-projects__header">
        <div>
          <h2 className="recent-projects__title">
            Recent Projects
          </h2>

          <p className="recent-projects__description">
            Keep track of your latest project activity.
          </p>
        </div>

        <Link
          to="/projects"
          className="recent-projects__view-all"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {recentProjects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
          icon={<FolderKanban size={32} />}
        />
      ) : (
        <div className="recent-projects__list">
          {recentProjects.map((project) => (
            <article
              key={project.id}
              className="recent-project-card"
            >
              <div className="recent-project-card__main">
                <div className="recent-project-card__icon">
                  <FolderKanban size={20} />
                </div>

                <div className="recent-project-card__info">
                  <h3 className="recent-project-card__name">
                    {project.name}
                  </h3>

                  <p className="recent-project-card__description">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="recent-project-card__details">
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>

                <div className="recent-project-card__progress">
                  <div className="recent-project-card__progress-info">
                    <span>Progress</span>
                    <strong>{project.progress}%</strong>
                  </div>

                  <div className="recent-project-card__progress-track">
                    <div
                      className="recent-project-card__progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, project.progress)
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="recent-project-card__date">
                  <CalendarDays size={15} />
                  <span>{formatDate(project.dueDate)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentProjects;
