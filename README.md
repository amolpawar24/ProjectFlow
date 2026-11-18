# ProjectFlow – Project & Task Management Dashboard

A modern, responsive project and task management dashboard built with **React, TypeScript, and Tailwind CSS**. ProjectFlow provides a centralized workspace to organize projects, manage tasks, track progress, and monitor productivity through a clean and intuitive interface.

---

## Overview

ProjectFlow is a frontend project management application designed to simplify project organization and task tracking.

The application provides an interactive dashboard where users can view project summaries, manage tasks, monitor project progress, and organize work based on priorities, deadlines, and completion status.

This project is developed as part of a **Frontend Developer Technical Assignment at Shekru Labs**.

## Features

### Dashboard
- Overview of total projects and tasks.
- Completed and pending task statistics.
- Project progress overview.
- Recent project information.
- Clear and organized dashboard interface.

### Project Management
- View all available projects.
- Display project names and descriptions.
- Track project status and due dates.
- Monitor project completion progress.
- Create and manage project information.

### Task Management
- Create new tasks.
- Edit existing tasks.
- Delete tasks.
- Assign task priorities:
  - Low
  - Medium
  - High
- Manage task statuses:
  - To Do
  - In Progress
  - Completed
- Set task descriptions and due dates.

### Search & Filtering
- Search tasks by title.
- Filter tasks by status.
- Filter tasks by priority.
- Easily locate specific tasks.

### User Interface
- Modern SaaS dashboard design.
- Responsive layout for desktop, tablet, and mobile.
- Reusable UI components.
- Consistent color system and typography.
- Interactive buttons, forms, and modals.
- Loading, empty, validation, and error states.

### Data Persistence
- Local data storage using browser LocalStorage.
- Preserve application data across page refreshes.
- Mock data for development and demonstration.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and build tooling |
| Tailwind CSS v4 | Utility-first styling |
| CSS3 | Custom styling and responsive layouts |
| LocalStorage | Client-side data persistence |
| ESLint | Code quality and linting |
| React Router | Client-side navigation, if used |

---

## Project Structure

```text
projectflow/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── logos/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── MainLayout.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── OverviewCards.tsx
│   │   │   │   └── RecentProjects.tsx
│   │   │   └── DashboardPage.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   └── ProjectList.tsx
│   │   │   └── ProjectsPage.tsx
│   │   │
│   │   └── tasks/
│   │       ├── components/
│   │       │   ├── TaskCard.tsx
│   │       │   ├── TaskFilters.tsx
│   │       │   ├── TaskForm.tsx
│   │       │   └── TaskList.tsx
│   │       └── TasksPage.tsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── styles/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── utilities/
│   │   └── main.css
│   │
│   ├── types/
│   │   ├── project.types.ts
│   │   └── task.types.ts
│   │
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   └── taskUtils.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

Follow these instructions to run ProjectFlow locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/projectflow.git
```

### 2. Navigate to the Project Directory

```bash
cd projectflow
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit the local development URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run lint` | Checks code quality using ESLint |
| `npm run preview` | Previews the production build locally |

---

## Application Workflow

1. Open the ProjectFlow dashboard.
2. Review project and task statistics.
3. Navigate to the Projects section to view project information.
4. Navigate to the Tasks section to manage tasks.
5. Create tasks with descriptions, priorities, and due dates.
6. Update task details and statuses when work progresses.
7. Search and filter tasks to organize work efficiently.
8. Track progress through the dashboard.

---

## Data Storage

ProjectFlow uses browser LocalStorage for client-side data persistence.

- No external backend is required.
- Mock data is used for initial application data.
- Changes can be stored locally in the browser.
- Data remains available after refreshing the page, provided browser storage is not cleared.

---

## Responsive Design

ProjectFlow is designed to provide a consistent experience across different screen sizes.

| Device | Layout |
|---|---|
| Desktop | Full dashboard with sidebar navigation |
| Tablet | Adapted navigation and content layout |
| Mobile | Compact navigation and responsive content |

---

## Future Improvements

The application can be extended with the following capabilities:

- Backend integration using REST APIs.
- User authentication and authorization.
- Team collaboration and task assignments.
- Real-time project updates.
- Notifications and reminders.
- Advanced project analytics.
- Drag-and-drop task management.
- Dark and light theme customization.

---

## Development Approach

The project follows a component-based and feature-oriented architecture.

Key development principles include:

- Reusable React components.
- Strong typing with TypeScript interfaces.
- Separation of application features and shared components.
- Centralized styling and design tokens.
- Responsive-first UI development.
- Maintainable and readable code.
- Separation of utility functions and application logic.

---

## Author

**Amol Pawar**

Frontend Developer

Project developed as part of the Frontend Developer Technical Assignment at **Shekru Labs**.

---

## License

This project was developed for educational and technical evaluation purposes.

No open-source license has been assigned.