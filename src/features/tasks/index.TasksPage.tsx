
import { useMemo, useState } from "react";
import { ListTodo, Plus, Trash2 } from "lucide-react";

import type { Project } from "../../types/project.types";
import type {
  Task,
  TaskFormData,
} from "../../types/task.types";

import { initialProjects, initialTasks } from "../../data/mockData";
import useLocalStorage from "../../hooks/useLocalStorage";

import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilters, {
  type TaskFiltersValue,
} from "./components/TaskFilters";

const TasksPage = () => {
  // LocalStorage
  const [projects] = useLocalStorage<Project[]>(
    "projectflow-projects",
    initialProjects
  );

  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "projectflow-tasks",
    initialTasks
  );

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Search and filter states
  const [filters, setFilters] = useState<TaskFiltersValue>({
    search: "",
    status: "All",
    priority: "All",
  });

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(filters.search.trim().toLowerCase());

      const matchesStatus =
        filters.status === "All" || task.status === filters.status;

      const matchesPriority =
        filters.priority === "All" ||
        task.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  // Open create form
  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  // Create or update task
  const handleSubmitTask = (data: TaskFormData) => {
    const currentDate = new Date().toISOString();

    if (selectedTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === selectedTask.id
            ? {
                ...task,
                ...data,
                updatedAt: currentDate,
              }
            : task
        )
      );

      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  // Request task deletion
  const handleDeleteRequest = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId);

    if (task) {
      setTaskToDelete(task);
    }
  };

  // Confirm task deletion
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskToDelete.id)
    );

    setTaskToDelete(null);
  };

  // Cancel task deletion
  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "All",
      priority: "All",
    });
  };

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "All" ||
    filters.priority !== "All";

  // Task statistics
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <section className="tasks-page">
      {/* Page Header */}
      <div className="tasks-page__header">
        <div className="tasks-page__heading">
          <h1 className="tasks-page__title">Tasks</h1>

          <p className="tasks-page__description">
            Manage, organize, and track all your project tasks.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleCreateTask}
          disabled={projects.length === 0}
        >
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="tasks-page__stats">
        <div className="tasks-page__stat">
          <span className="tasks-page__stat-label">Total Tasks</span>
          <strong className="tasks-page__stat-value">
            {tasks.length}
          </strong>
        </div>

        <div className="tasks-page__stat">
          <span className="tasks-page__stat-label">Completed</span>
          <strong className="tasks-page__stat-value">
            {completedTasks}
          </strong>
        </div>

        <div className="tasks-page__stat">
          <span className="tasks-page__stat-label">Pending</span>
          <strong className="tasks-page__stat-value">
            {pendingTasks}
          </strong>
        </div>
      </div>

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onChange={setFilters}
      />

      {/* Task List Heading */}
      <div className="tasks-page__list-header">
        <div>
          <h2 className="tasks-page__section-title">
            All Tasks
          </h2>

          <p className="tasks-page__result-count">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Task List */}
      {projects.length === 0 ? (
        <div className="tasks-page__empty">
          <EmptyState
            title="No projects available"
            description="Create a project first before adding tasks."
            icon={<ListTodo size={32} />}
          />
        </div>
      ) : (
        <>
          {filteredTasks.length === 0 && hasActiveFilters ? (
            <div className="tasks-page__empty">
              <EmptyState
                title="No matching tasks"
                description="Try changing your search or filter criteria."
                icon={<ListTodo size={32} />}
                action={
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                }
              />
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteRequest}
            />
          )}
        </>
      )}

      {/* Create / Edit Task Modal */}
      <TaskForm
        key={selectedTask?.id ?? "new-task"}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
        projects={projects}
        task={selectedTask ?? undefined}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(taskToDelete)}
        onClose={handleCancelDelete}
        title="Delete Task"
        size="sm"
        footer={
          <div className="tasks-page__modal-footer">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleConfirmDelete}
            >
              <Trash2 size={16} />
              Delete Task
            </Button>
          </div>
        }
      >
        <div className="tasks-page__delete-content">
          <p>
            Are you sure you want to delete{" "}
            <strong>{taskToDelete?.title}</strong>?
          </p>

          <span>This action cannot be undone.</span>
        </div>
      </Modal>
    </section>
  );
};

export default TasksPage;
