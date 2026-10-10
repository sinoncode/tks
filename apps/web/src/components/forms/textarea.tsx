/** Textarea with a live character counter (kept uncontrolled for react-hook-form). */
export function Textarea({
  count,
  limit,
  ...props
}: Omit<React.ComponentProps<'textarea'>, 'max'> & { count?: number; limit?: number }) {
  const length = count ?? 0;
  return (
    <div className="form-textarea">
      <textarea {...props} maxLength={limit} />
      {limit ? (
        <span className={`form-counter ${length > limit * 0.9 ? 'is-high' : ''}`.trim()}>
          {length} / {limit}
        </span>
      ) : null}
    </div>
  );
}
