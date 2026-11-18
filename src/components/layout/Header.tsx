
import { useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronRight,
  Plus,
} from "lucide-react";

const pageDetails: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Welcome back! Here's what's happening with your workspace.",
  },
  "/projects": {
    title: "Projects",
    description: "Manage, organize, and track all your projects.",
  },
  "/tasks": {
    title: "Tasks",
    description: "Stay organized and keep track of your work.",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your workspace preferences and settings.",
  },
};

const Header = () => {
  const location = useLocation();

  const currentPage =
    pageDetails[location.pathname] ?? pageDetails["/dashboard"];

  return (
    <header className="header">
      {/* Page Information */}
      <div className="header__page-info">
        <div className="header__breadcrumb">
          <span className="header__breadcrumb-item">
            Workspace
          </span>

          <ChevronRight size={14} />

          <span className="header__breadcrumb-current">
            {currentPage.title}
          </span>
        </div>

        <div className="header__heading">
          <div className="header__title-group">
            <h1 className="header__title">
              {currentPage.title}
            </h1>

            <p className="header__description">
              {currentPage.description}
            </p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="header__actions">
        {/* Search */}
        <div className="header__search">
          <Search
            size={18}
            className="header__search-icon"
          />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            className="header__search-input"
          />

          <kbd className="header__search-shortcut">
            Ctrl K
          </kbd>
        </div>

        {/* Quick Add */}
        <button
          type="button"
          className="header__quick-add"
          aria-label="Quick add"
          title="Quick add"
        >
          <Plus size={19} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="header__notification"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} />

          <span className="header__notification-indicator" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="header__profile"
          aria-label="User profile"
        >
          <span className="header__avatar">
            AP
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
