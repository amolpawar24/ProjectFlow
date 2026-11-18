
export const formatDate = (date: string): string => {
  if (!date) return "No date";

  const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

export const isOverdue = (
  date: string,
  status?: string
): boolean => {
  if (!date || status === "Completed") return false;

  const dueDate = new Date(`${date.slice(0, 10)}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return (
    !Number.isNaN(dueDate.getTime()) &&
    dueDate < today
  );
};

export const getDaysRemaining = (date: string): number => {
  if (!date) return 0;

  const dueDate = new Date(`${date.slice(0, 10)}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(dueDate.getTime())) return 0;

  return Math.ceil(
    (dueDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

export const getRelativeDate = (date: string): string => {
  const days = getDaysRemaining(date);

  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";

  return `Due in ${days} days`;
};
