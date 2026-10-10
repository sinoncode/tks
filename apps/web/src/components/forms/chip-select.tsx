type ChipOption = { value: string; label: string };

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

/** Toggleable chip group — multi-select tags or single-select chips. */
export function ChipSelect({
  options,
  ariaLabel,
  ...rest
}: { options: readonly ChipOption[]; ariaLabel: string } & (MultiProps | SingleProps)) {
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
      onChange(value === v ? '' : v);
    }
  };
  return (
    <div className="chip-select" role="group" aria-label={ariaLabel}>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          className={selected(option.value) ? 'is-active' : ''}
          aria-pressed={selected(option.value)}
          onClick={() => toggle(option.value)}
        >
          <i aria-hidden="true" />
          {option.label}
        </button>
      ))}
    </div>
  );
}
