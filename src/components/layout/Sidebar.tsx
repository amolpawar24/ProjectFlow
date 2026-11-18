
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  Zap,
  CircleHelp,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <Zap size={22} strokeWidth={2.5} />
        </div>

        <div className="sidebar__brand-content">
          <h2 className="sidebar__brand-name">ProjectFlow</h2>
          <span className="sidebar__brand-subtitle">
            Workspace
          </span>
        </div>
      </div>

      {/* Workspace */}
      <div className="sidebar__workspace">
        <div className="sidebar__workspace-icon">
          <span>PF</span>
        </div>

        <div className="sidebar__workspace-info">
          <span className="sidebar__workspace-label">
            Workspace
          </span>
          <span className="sidebar__workspace-name">
            My Workspace
          </span>
        </div>

        <ChevronRight
          size={16}
          className="sidebar__workspace-arrow"
        />
      </div>

      {/* Navigation */}
      <nav className="sidebar__navigation">
        <span className="sidebar__section-label">
          MENU
        </span>

        <ul className="sidebar__nav-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `sidebar__nav-link ${
                      isActive ? "sidebar__nav-link--active" : ""
                    }`
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="sidebar__nav-icon"
                  />

                  <span className="sidebar__nav-text">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="sidebar__bottom">
        <span className="sidebar__section-label">
          PREFERENCES
        </span>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar__nav-link ${
              isActive ? "sidebar__nav-link--active" : ""
            }`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span className="sidebar__nav-text">Settings</span>
        </NavLink>

        <a href="mailto:support@example.com" className="sidebar__nav-link">
          <CircleHelp size={19} strokeWidth={1.8} />
          <span className="sidebar__nav-text">Help & Support</span>
        </a>

        {/* Profile */}
        <div className="sidebar__profile">
          <div className="sidebar__profile-avatar">
            AP
          </div>

          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">
              Amol Pawar
            </span>
            <span className="sidebar__profile-role">
              Frontend Developer
            </span>
          </div>

          <ChevronRight size={16} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
