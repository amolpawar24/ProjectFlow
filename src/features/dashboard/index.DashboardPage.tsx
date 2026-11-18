
import OverviewCards from "./components/OverviewCards";
import RecentProjects from "./components/RecentProjects";

import useLocalStorage from "../../hooks/useLocalStorage";

import { initialProjects, initialTasks } from "../../data/mockData";

import type { Project } from "../../types/project.types";
import type { Task } from "../../types/task.types";

const DashboardPage = () => {
  const [projects] = useLocalStorage<Project[]>(
    "projectflow_projects",
    initialProjects
  );

  const [tasks] = useLocalStorage<Task[]>(
    "projectflow_tasks",
    initialTasks
  );

  return (
    <div className="dashboard-page">
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
