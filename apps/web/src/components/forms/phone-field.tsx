import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { parsePhoneNumberWithError, type CountryCode } from 'libphonenumber-js';
import { countries, countryByCode } from '@/data/countries';

/** Formats the entered national number as E.164 using the selected country. */
export function phoneE164(iso: string, number: string) {
  const digits = number.replace(/[^\d]/g, '');
  if (!digits) return '';
  try {
    const parsed = parsePhoneNumberWithError(number, iso as CountryCode);
    return parsed.format('E.164');
  } catch {
    const country = countryByCode(iso);
    return `+${country?.dial ?? ''}${digits}`;
  }
}

/** Best-guess country from the browser locale; falls back to the US (+1). */
export function detectPhoneCountry(): string {
  try {
    const region = (navigator.language || 'en-US').split('-')[1]?.toUpperCase();
    if (region && countryByCode(region)) return region;
  } catch {
    // locale unavailable — fall through to the default
  }
  return 'US';
}

type Props = {
  id: string;
  country: string;
  onCountryChange: (iso: string) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
};

/** Phone input with a searchable country-code dropdown; outputs E.164 on submit. */
export function PhoneField({ id, country, onCountryChange, value, onChange, onBlur, error, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const selected = countryByCode(country);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dial.startsWith(q.replace('+', '')) ||
        c.code.toLowerCase() === q,
    );
  }, [query]);

  useEffect(() => setActive(0), [results.length, query]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) search.current?.focus();
    else setQuery('');
  }, [open]);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const choose = (iso: string) => {
    onCountryChange(iso);
    setOpen(false);
  };

  const onSearchKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(index => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(index => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (results[active]) choose(results[active].code);
    }
  };

  return (
    <div className={`phone-field ${error ? 'has-error' : ''}`.trim()} ref={wrap}>
      <button
        type="button"
        className="phone-country"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${selected?.name ?? 'select'} +${selected?.dial ?? ''}`}
        disabled={disabled}
      >
        <span aria-hidden="true">{selected?.flag ?? '··'}</span>
        <span className="phone-dial">+{selected?.dial ?? '—'}</span>
        <ChevronDown size={14} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={selected ? `e.g. ${selected.name === 'United States' ? '555 010 2040' : 'phone number'}` : 'Phone number'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {open ? (
        <div className="phone-popover" role="listbox" aria-label="Country code" ref={list}>
          <div className="phone-popover-search">
            <Search size={14} strokeWidth={1.75} aria-hidden="true" />
            <input
              ref={search}
              type="text"
              role="searchbox"
              aria-label="Search countries"
              placeholder="Search country or code"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={onSearchKey}
            />
          </div>
          <div className="phone-popover-list">
            {results.map((c, i) => (
              <div
                key={c.code}
                role="option"
                tabIndex={-1}
                aria-selected={c.code === country}
                className={`${c.code === country ? 'is-selected' : ''} ${i === active ? 'is-active' : ''}`.trim()}
                onMouseEnter={() => setActive(i)}
                onMouseDown={event => event.preventDefault()}
                onClick={() => choose(c.code)}
              >
                <span aria-hidden="true">{c.flag}</span>
                <span className="phone-popover-name">{c.name}</span>
                <span className="phone-popover-dial">+{c.dial}</span>
              </div>
            ))}
            {results.length === 0 ? <p className="phone-popover-empty">No country matches “{query}”.</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
