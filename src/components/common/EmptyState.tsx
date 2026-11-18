
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({
  title = "Nothing here yet",
  description = "There is no data to display right now.",
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        {icon || <Inbox size={32} strokeWidth={1.6} />}
      </div>

      <h3 className="empty-state__title">
        {title}
      </h3>

      <p className="empty-state__description">
        {description}
      </p>

      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
