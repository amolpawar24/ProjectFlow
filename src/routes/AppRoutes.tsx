
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../features/dashboard/index.DashboardPage";
import ProjectsPage from "../features/projects/index.ProjectsPage";
import TasksPage from "../features/tasks/index.TasksPage";

// Temporary Settings Page
const SettingsPage = () => {
  return (
    <div>
      <h2>Settings</h2>
      <p>Manage your workspace preferences.</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Application Layout */}
      <Route element={<MainLayout />}>
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/tasks"
          element={<TasksPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />
      </Route>

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
