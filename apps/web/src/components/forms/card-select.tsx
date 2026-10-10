import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

export type CardOption = { value: string; label: string; description?: string; icon?: LucideIcon };

type MultiProps = {
  multi: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SingleProps = {
  multi?: false;
  value: string;
  onChange: (value: string) => void;
};

/** Selectable card group — multi-select icon cards or single-select radio cards. */
export function CardSelect({
  options,
  ariaLabel,
  columns = 2,
  ...rest
}: { options: readonly CardOption[]; ariaLabel: string; columns?: 1 | 2 | 3 } & (
  | MultiProps
  | SingleProps
)) {
  const { value, onChange, multi } = rest as {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multi?: boolean;
  };
  const selected = (v: string) => (Array.isArray(value) ? value.includes(v) : value === v);
  const toggle = (v: string) => {
    if (Array.isArray(value)) {
      onChange(value.includes(v) ? value.filter(item => item !== v) : [...value, v]);
    } else {
      onChange(v);
    }
  };
  return (
    <div
      className={`card-select card-select--${columns}`}
      role={multi ? 'group' : 'radiogroup'}
      aria-label={ariaLabel}
    >
      {options.map(option => {
        const Icon = option.icon;
        const isOn = selected(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role={multi ? undefined : 'radio'}
            aria-checked={multi ? undefined : isOn}
            aria-pressed={multi ? isOn : undefined}
            className={isOn ? 'is-active' : ''}
            onClick={() => toggle(option.value)}
          >
            {Icon ? <Icon size={18} strokeWidth={1.75} aria-hidden="true" /> : null}
            <span className="card-select-label">{option.label}</span>
            {option.description ? <span className="card-select-desc">{option.description}</span> : null}
            <span className="card-select-check" aria-hidden="true">
              <Check size={12} strokeWidth={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
