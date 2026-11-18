
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}: InputProps) => {
  const inputId =
    id || props.name || props.placeholder || "form-input";

  return (
    <div className="input-group">
      {label && (
        <label
          htmlFor={inputId}
          className="input-group__label"
        >
          {label}
        </label>
      )}

      <div
        className={`input-wrapper ${
          error ? "input-wrapper--error" : ""
        }`}
      >
        {leftIcon && (
          <span className="input-wrapper__icon input-wrapper__icon--left">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={`input ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />

        {rightIcon && (
          <span className="input-wrapper__icon input-wrapper__icon--right">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <span
          id={`${inputId}-error`}
          className="input-group__error"
          role="alert"
        >
          {error}
        </span>
      )}

      {!error && helperText && (
        <span
          id={`${inputId}-helper`}
          className="input-group__helper"
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
