import type { ReactNode } from 'react';

/** aria wiring for a field with an optional error message. */
export function fieldAria(id: string, error?: string) {
  return {
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  };
}

/** Label + control + inline error / hint wrapper. */
export function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
  className = '',
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && (
          <span className="form-req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="form-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="form-hint">{hint}</p>
      ) : null}
    </div>
  );
}
