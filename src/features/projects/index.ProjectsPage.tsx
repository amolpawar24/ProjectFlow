
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import type { Project, ProjectFormData } from "../../types/project.types";

import { initialProjects } from "../../data/mockData";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";

import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import useLocalStorage from "../../hooks/useLocalStorage";

const ProjectsPage = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projectflow-projects",
    initialProjects,
  );

  const [searchParams] = useSearchParams();

  // Get search text from the Header
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";

  // Filter projects by their names
  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery),
    );
  }, [projects, searchQuery]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Open create project form
  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  // Open edit project form
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  // Close project form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProject(null);
  };

  // Create or update project
  const handleSubmitProject = (data: ProjectFormData) => {
    const currentDate = new Date().toISOString();

    if (selectedProject) {
      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                ...data,
                progress: data.status === "Completed" ? 100 : project.progress,
                updatedAt: currentDate,
              }
            : project,
        ),
      );

      return;
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      ...data,
      progress: data.status === "Completed" ? 100 : 0,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    setProjects((previousProjects) => [newProject, ...previousProjects]);
  };

  // Open delete confirmation
  const handleDeleteRequest = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);

    if (project) {
      setProjectToDelete(project);
    }
  };

  // Confirm project deletion
  const handleConfirmDelete = () => {
    if (!projectToDelete) return;

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectToDelete.id),
    );

    setProjectToDelete(null);
  };

  return (
    <div className="projects-page">
      {/* Page Header */}
      <div className="projects-page__header">
        <div className="projects-page__heading">
          <h1 className="projects-page__title">Projects</h1>

          <p className="projects-page__description">
            Manage your projects and track their progress.
          </p>
        </div>

        <Button variant="primary" onClick={handleCreateProject}>
          <Plus size={18} />
          <span>New Project</span>
        </Button>
      </div>

      {/* Project Listing */}
      <ProjectList
        projects={filteredProjects}
        onEdit={handleEditProject}
        onDelete={handleDeleteRequest}
      />

      {/* Create / Edit Project Modal */}
      <ProjectForm
        key={selectedProject?.id ?? "new-project"}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitProject}
        project={selectedProject}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        title="Delete Project"
        size="sm"
        footer={
          <div className="projects-page__modal-footer">
            <Button variant="ghost" onClick={() => setProjectToDelete(null)}>
              Cancel
            </Button>

            <Button variant="danger" onClick={handleConfirmDelete}>
              <Trash2 size={16} />
              Delete Project
            </Button>
          </div>
        }
      >
        <div className="projects-page__delete-content">
          <p>
            Are you sure you want to delete{" "}
            <strong>{projectToDelete?.name}</strong>?
          </p>

          <p>This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
