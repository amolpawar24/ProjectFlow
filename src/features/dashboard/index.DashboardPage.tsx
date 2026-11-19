
import { AlertCircle } from "lucide-react";

import OverviewCards from "./components/OverviewCards";
import RecentProjects from "./components/RecentProjects";

import useLocalStorage from "../../hooks/useLocalStorage";

import { initialProjects, initialTasks } from "../../data/mockData";

import type { Project } from "../../types/project.types";
import type { Task } from "../../types/task.types";

const DashboardPage = () => {
  const [projects, , projectError] = useLocalStorage<Project[]>(
    "projectflow-projects",
    initialProjects
  );

  const [tasks, , taskError] = useLocalStorage<Task[]>(
    "projectflow-tasks",
    initialTasks
  );

  return (
    <div className="dashboard-page">
      {/* Error State */}
      {(projectError || taskError) && (
        <div className="dashboard-error" role="alert">
          <AlertCircle size={18} />

          <div>
            <strong>Something went wrong</strong>

            <p>{projectError || taskError}</p>
          </div>
        </div>
      )}

      {/* Dashboard Overview */}
      <section className="page-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Workspace Overview
            </h2>

            <p className="page-description">
              Here's a snapshot of your project activity.
            </p>
          </div>
        </div>

        <OverviewCards
          projects={projects}
          tasks={tasks}
        />
      </section>

      {/* Recent Projects */}
      <section className="page-section">
        <RecentProjects projects={projects} />
      </section>
    </div>
  );
};

export default DashboardPage;
