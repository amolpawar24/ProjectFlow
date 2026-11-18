
import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoaderProps) => {
  return (
    <div
      className={`loader ${
        fullScreen ? "loader--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="loader__icon"
        size={
          size === "sm" ? 18 : size === "lg" ? 40 : 28
        }
      />

      {text && (
        <span className="loader__text">
          {text}
        </span>
      )}

      <span className="sr-only">{text}</span>
    </div>
  );
};

export default Loader;
