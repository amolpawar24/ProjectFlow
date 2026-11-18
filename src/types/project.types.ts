
export type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Completed"
  | "On Hold";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
}
