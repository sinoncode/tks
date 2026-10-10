import { ChevronDown } from 'lucide-react';

type Option = { value: string; label: string };

/** Styled native select — accessible, keyboard-friendly, 48px touch target. */
export function Select({
  options,
  placeholder,
  ...props
}: React.ComponentProps<'select'> & { options: readonly Option[]; placeholder?: string }) {
  return (
    <div className="form-select">
      <select {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
    </div>
  );
}

export const toOptions = (values: readonly string[]): Option[] =>
  values.map(value => ({ value, label: value }));
