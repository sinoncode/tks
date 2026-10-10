/**
 * Shared enquiry submission — no database, no storage APIs. POSTs JSON to the
 * form endpoint (Formspree / Web3Forms / Getform style) with a 15-second
 * timeout, and always offers a prefilled mailto fallback on failure.
 */

export type SubmitSuccess = { ok: true };
export type SubmitFailure = { ok: false; message: string; mailtoHref: string };
export type SubmitResult = SubmitSuccess | SubmitFailure;

export type EnquirySubmission = {
  /** Recipient for the mailto fallback. */
  to: string;
  /** e.g. "New enquiry - Fibre Construction - Example Ltd" */
  subject: string;
  /** Readable plain-text email body. */
  body: string;
  /** Flat field map sent alongside the human-readable body. */
  fields: Record<string, string>;
};

const endpoint = () => import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export function mailtoHref(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Renders a labelled plain-text section list into an email body. */
export function buildEnquiryBody(sections: readonly (readonly [string, string])[]) {
  return sections
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

export async function submitEnquiry(submission: EnquirySubmission): Promise<SubmitResult> {
  const { to, subject, body, fields } = submission;
  const url = endpoint();

  if (!url) {
    return {
      ok: false,
      message:
        'The form endpoint is not configured yet, so we could not send your enquiry automatically.',
      mailtoHref: mailtoHref(to, subject, body),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, message: body, ...fields }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `The form service answered with ${response.status} ${response.statusText}.`,
        mailtoHref: mailtoHref(to, subject, body),
      };
    }

    return { ok: true };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError';
    return {
      ok: false,
      message: aborted
        ? 'The form service timed out after 15 seconds.'
        : 'We could not reach the form service — check your connection and try again.',
      mailtoHref: mailtoHref(to, subject, body),
    };
  } finally {
    clearTimeout(timeout);
  }
}
