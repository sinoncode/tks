import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

/** Custom-styled checkbox with a 48px touch target and visible focus ring. */
export function Checkbox({
  id,
  label,
  error,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type' | 'id'> & { id: string; label: ReactNode; error?: string }) {
  return (
    <div className={`form-check ${error ? 'has-error' : ''}`.trim()}>
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id}>
        <span className="form-check-box" aria-hidden="true">
          <Check size={13} strokeWidth={3} />
        </span>
        <span>{label}</span>
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
