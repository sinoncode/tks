import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ChevronDown, FileText, RadioTower, User } from 'lucide-react';
import { contactSchema, contactStepFields, type ContactFormValues } from '@/lib/enquirySchema';
import { buildEnquiryBody, submitEnquiry, type SubmitFailure } from '@/lib/submitEnquiry';
import { Field, fieldAria } from '@/components/forms/field';
import { Select, toOptions } from '@/components/forms/select';
import { Textarea } from '@/components/forms/textarea';
import { Checkbox } from '@/components/forms/checkbox';
import { ChipSelect } from '@/components/forms/chip-select';
import { CardSelect } from '@/components/forms/card-select';
import { PhoneField, detectPhoneCountry, phoneE164 } from '@/components/forms/phone-field';
import { StepProgress } from '@/components/forms/step-progress';
import { TKButton } from '@/components/ui/tk-button';
import { countries, countryByCode } from '@/data/countries';
import {
  bestTimes,
  budgets,
  contactMethods,
  isFreeMail,
  organisationTypes,
  projectStages,
  referralSources,
  scaleGroupsForServices,
  serviceLabel,
  serviceOptions,
  targetStarts,
  technologyOptions,
} from '@/data/formOptions';
import { site } from '@/data/site';
import { ContactSuccess } from '@/components/contact/success';

const STEPS = [
  { label: 'About you', icon: User, title: 'Tell us about you' },
  { label: 'Your project', icon: RadioTower, title: 'Tell us about the project' },
  { label: 'Details', icon: FileText, title: 'Details & confirmation' },
];

const countryOptions = countries.map(country => ({ value: country.code, label: country.name }));

const defaultsFor = (prefill: Record<string, unknown> | undefined, typeParam: string | null): ContactFormValues => {
  const prefillServices = Array.isArray(prefill?.services) ? (prefill.services as string[]) : [];
  const services =
    typeParam && serviceOptions.some(option => option.value === typeParam)
      ? [typeParam]
      : prefillServices.filter(slug => serviceOptions.some(option => option.value === slug));
  const text = (key: string) => (typeof prefill?.[key] === 'string' ? (prefill[key] as string) : '');
  return {
    fullName: text('fullName'),
    jobTitle: '',
    company: text('company'),
    orgType: text('orgType'),
    email: text('email'),
    phoneCountry: typeof prefill?.phoneCountry === 'string' ? text('phoneCountry') : 'US',
    phoneNumber: text('phoneNumber'),
    contactMethod: text('contactMethod') || 'Email',
    bestTime: 'Morning',
    services,
    technologies: [],
    projectStage: text('projectStage'),
    country: text('country'),
    region: '',
    city: text('city'),
    sites: '',
    routeLength: '',
    routeUnit: 'km',
    buildings: '',
    floors: '',
    targetStart: text('targetStart'),
    budget: '',
    details: text('description'),
    docLink: '',
    referral: '',
    nda: prefill?.nda === true,
    consent: false,
    company_website: '',
  };
};

/** The 3-step project enquiry wizard. */
export function ContactWizard() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const reduce = useReducedMotion();
  const prefill = (location.state as { enquiry?: Record<string, unknown> } | null)?.enquiry;
  const typeParam = searchParams.get('type');
  const roleParam = searchParams.get('role');

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [fail, setFail] = useState<SubmitFailure | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [tz, setTz] = useState('');
  const [hidden, setHidden] = useState({
    sourcePage: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
  });
  const startedAt = useRef(0);
  const submitting = useRef(false);
  const hasPhonePrefill = typeof prefill?.phoneCountry === 'string' && !!prefill.phoneCountry;

  const { register, handleSubmit, trigger, watch, setValue, getValues, control, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: useMemo(() => defaultsFor(prefill, typeParam), [prefill, typeParam]),
  });

  const values = watch();
  const scale = scaleGroupsForServices(values.services ?? []);
  const emailHint =
    !errors.email && values.email && isFreeMail(values.email)
      ? 'A work email helps us route your enquiry faster — but a personal address works too.'
      : undefined;

  useEffect(() => {
    startedAt.current = Date.now();
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    if (!hasPhonePrefill) setValue('phoneCountry', detectPhoneCountry(), { shouldValidate: false });
    const params = new URLSearchParams(window.location.search);
    setHidden({
      sourcePage: window.location.href,
      referrer: document.referrer,
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusFirstInvalid = () => {
    window.setTimeout(() => {
      for (const name of contactStepFields[step]) {
        if (document.getElementById(`${name}-error`)) {
          document.getElementById(name)?.focus();
          return;
        }
      }
    }, 0);
  };

  const next = async () => {
    const valid = await trigger([...contactStepFields[step]]);
    if (!valid) {
      focusFirstInvalid();
      return;
    }
    setDir(1);
    setStep(current => Math.min(current + 1, STEPS.length - 1));
  };

  const back = () => {
    setDir(-1);
    setStep(current => Math.max(current - 1, 0));
  };

  const onStepKey = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLElement;
    if (['TEXTAREA', 'BUTTON', 'A'].includes(target.tagName)) return;
    event.preventDefault();
    if (step < STEPS.length - 1) void next();
    else handleSubmit(onSubmit)();
  };

  const onSubmit = async (form: ContactFormValues) => {
    if (submitting.current) return;
    if (Date.now() - startedAt.current < 3000) {
      setSubmitError('Please take a moment to review your answers before submitting.');
      return;
    }
    if (form.company_website) {
      setSubmitError('Submission blocked — please review the form and try again.');
      return;
    }
    setSubmitError('');
    submitting.current = true;
    setStatus('submitting');

    const e164 = phoneE164(form.phoneCountry, form.phoneNumber);
    const countryName = countryByCode(form.country)?.name ?? form.country;
    const sections: (readonly [string, string])[] = [
      ['Full name', form.fullName],
      ['Job title', form.jobTitle ?? ''],
      ['Company / organisation', form.company],
      ['Organisation type', form.orgType],
      ['Email', form.email],
      ['Phone / WhatsApp (E.164)', e164],
      ['Preferred contact method', form.contactMethod],
      ['Best time to reach', `${form.bestTime}${tz ? ` (${tz})` : ''}`],
      ['Services needed', form.services.map(serviceLabel).join(', ')],
      ['Technologies involved', form.technologies.join(', ')],
      ['Project stage', form.projectStage],
      ['Project location', [form.city, form.region, countryName].filter(Boolean).join(', ')],
      ['Number of sites', form.sites ?? ''],
      ['Route length', form.routeLength ? `${form.routeLength} ${form.routeUnit}` : ''],
      ['Buildings / floors', [form.buildings, form.floors].filter(Boolean).join(' / ')],
      ['Target start', form.targetStart],
      ['Indicative budget', form.budget ?? ''],
      ['Project details', form.details],
      ['Documents link', form.docLink ?? ''],
      ['Heard about us via', form.referral ?? ''],
      ['NDA requested', form.nda ? 'Yes' : 'No'],
    ];
    const subject = `New enquiry - ${serviceLabel(form.services[0] ?? '')} - ${form.company}`;
    const fields: Record<string, string> = {
      ...Object.fromEntries(sections),
      consent: 'true',
      sourcePage: hidden.sourcePage,
      referrer: hidden.referrer,
      utmSource: hidden.utmSource,
      utmMedium: hidden.utmMedium,
      utmCampaign: hidden.utmCampaign,
      role: roleParam ?? '',
      timestamp: new Date().toISOString(),
    };

    const result = await submitEnquiry({ to: site.contact.email, subject, body: buildEnquiryBody(sections), fields });
    submitting.current = false;
    if (result.ok) {
      setStatus('success');
    } else {
      setFail(result);
      setStatus('error');
    }
  };

  const retry = () => {
    setFail(null);
    setStatus('idle');
    window.setTimeout(() => handleSubmit(onSubmit)(), 50);
  };

  if (status === 'success') {
    const form = getValues();
    return (
      <ContactSuccess
        name={form.fullName}
        summary={[
          ['Name', form.fullName],
          ['Company', form.company],
          ['Email', form.email],
          ['Services', form.services.map(serviceLabel).join(', ')],
          ['Project location', [form.city, countryByCode(form.country)?.name].filter(Boolean).join(', ')],
        ]}
      />
    );
  }

  const stepVariants = {
    enter: (direction: number) => ({ opacity: 0, x: reduce ? 0 : direction * 44 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: reduce ? 0 : direction * -44 }),
  };

  return (
    <form className="wizard-card glass-card" onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={onStepKey}>
      <input
        type="text"
        id="company_website"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register('company_website')}
      />
      <header className="wizard-head">
        <StepProgress steps={STEPS} current={step} />
        <h2 className="wizard-title">{STEPS[step].title}</h2>
      </header>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={step}
          className="wizard-step"
          custom={dir}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 ? (
            <div className="wizard-grid">
              <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
                <input id="fullName" type="text" autoComplete="name" placeholder="e.g. Amara Okafor" {...fieldAria('fullName', errors.fullName?.message)} {...register('fullName')} />
              </Field>
              <Field id="jobTitle" label="Job title / role" error={errors.jobTitle?.message}>
                <input id="jobTitle" type="text" autoComplete="organization-title" placeholder="e.g. Head of Network Rollout" {...register('jobTitle')} />
              </Field>
              <Field id="company" label="Company / organisation" required error={errors.company?.message}>
                <input id="company" type="text" autoComplete="organization" placeholder="e.g. Meridian Telecom" {...fieldAria('company', errors.company?.message)} {...register('company')} />
              </Field>
              <Field id="orgType" label="Organisation type" required error={errors.orgType?.message} className="form-field--full">
                <div id="orgType" tabIndex={-1}>
                  <ChipSelect
                    ariaLabel="Organisation type"
                    options={organisationTypes.map(value => ({ value, label: value }))}
                    value={values.orgType ?? ''}
                    onChange={value => setValue('orgType', value, { shouldValidate: true })}
                  />
                </div>
              </Field>
              <Field id="email" label="Work email" required error={errors.email?.message} hint={emailHint} className="form-field--full">
                <input id="email" type="email" inputMode="email" autoComplete="email" placeholder="e.g. amara@meridiantel.com" {...fieldAria('email', errors.email?.message)} {...register('email')} />
              </Field>
              <Field id="phoneNumber" label="Phone / WhatsApp" required error={errors.phoneNumber?.message ?? errors.phoneCountry?.message} className="form-field--full">
                <Controller
                  name="phoneCountry"
                  control={control}
                  render={({ field }) => (
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: number }) => (
                        <PhoneField
                          id="phoneNumber"
                          country={field.value}
                          onCountryChange={field.onChange}
                          value={number.value ?? ''}
                          onChange={number.onChange}
                          onBlur={number.onBlur}
                          error={errors.phoneNumber?.message ?? errors.phoneCountry?.message}
                        />
                      )}
                    />
                  )}
                />
              </Field>
              <Field id="contactMethod" label="Preferred contact method" error={errors.contactMethod?.message}>
                <div id="contactMethod" className="segmented" role="radiogroup" aria-label="Preferred contact method">
                  {contactMethods.map(method => (
                    <button key={method} type="button" role="radio" aria-checked={values.contactMethod === method} className={values.contactMethod === method ? 'is-active' : ''} onClick={() => setValue('contactMethod', method, { shouldValidate: true })}>
                      {method}
                    </button>
                  ))}
                </div>
              </Field>
              <Field id="bestTime" label="Best time to reach you" error={errors.bestTime?.message} hint={tz ? `Your timezone: ${tz}` : undefined}>
                <div id="bestTime" className="segmented" role="radiogroup" aria-label="Best time to reach you">
                  {bestTimes.map(time => (
                    <button key={time} type="button" role="radio" aria-checked={values.bestTime === time} className={values.bestTime === time ? 'is-active' : ''} onClick={() => setValue('bestTime', time, { shouldValidate: true })}>
                      {time}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="wizard-grid">
              <Field id="services" label="Services needed" required error={errors.services?.message} className="form-field--full">
                <div id="services" tabIndex={-1}>
                  <CardSelect
                    ariaLabel="Services needed"
                    multi
                    columns={2}
                    options={serviceOptions}
                    value={values.services ?? []}
                    onChange={selected => setValue('services', selected, { shouldValidate: true })}
                  />
                </div>
              </Field>
              <Field id="technologies" label="Technologies involved" hint="Optional — select all that apply." className="form-field--full">
                <ChipSelect
                  ariaLabel="Technologies involved"
                  multi
                  options={technologyOptions.map(value => ({ value, label: value }))}
                  value={values.technologies ?? []}
                  onChange={selected => setValue('technologies', selected)}
                />
              </Field>
              <Field id="projectStage" label="Project stage" required error={errors.projectStage?.message} className="form-field--full">
                <div id="projectStage" tabIndex={-1}>
                  <CardSelect
                    ariaLabel="Project stage"
                    options={projectStages.map(value => ({ value, label: value }))}
                    value={values.projectStage ?? ''}
                    onChange={value => setValue('projectStage', value, { shouldValidate: true })}
                  />
                </div>
              </Field>
              <Field id="country" label="Project country" required error={errors.country?.message}>
                <Select id="country" autoComplete="country-name" options={countryOptions} placeholder="Select a country" {...fieldAria('country', errors.country?.message)} {...register('country')} />
              </Field>
              <Field id="region" label="State / region" error={errors.region?.message}>
                <input id="region" type="text" autoComplete="address-level1" placeholder="e.g. Lagos State" {...register('region')} />
              </Field>
              <Field id="city" label="City / area" required error={errors.city?.message}>
                <input id="city" type="text" autoComplete="address-level2" placeholder="e.g. Ikeja" {...fieldAria('city', errors.city?.message)} {...register('city')} />
              </Field>
              <AnimatePresence initial={false}>
                {scale.sites ? (
                  <motion.div key="sites" className="form-field form-field--full" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                    <Field id="sites" label="Number of sites" hint="Wireless services selected — tell us the site count.">
                      <input id="sites" type="text" inputMode="numeric" placeholder="e.g. 120 sites" {...register('sites')} />
                    </Field>
                  </motion.div>
                ) : null}
                {scale.route ? (
                  <motion.div key="route" className="form-field form-field--full" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                    <Field id="routeLength" label="Route length" hint="Fibre services selected — tell us the route length.">
                      <div className="route-field">
                        <input id="routeLength" type="text" inputMode="decimal" placeholder="e.g. 45" {...register('routeLength')} />
                        <div className="segmented segmented--unit" role="radiogroup" aria-label="Route unit">
                          {(['km', 'miles'] as const).map(unit => (
                            <button key={unit} type="button" role="radio" aria-checked={values.routeUnit === unit} className={values.routeUnit === unit ? 'is-active' : ''} onClick={() => setValue('routeUnit', unit)}>
                              {unit}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Field>
                  </motion.div>
                ) : null}
                {scale.buildings ? (
                  <motion.div key="buildings" className="form-field form-field--full" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                    <div className="wizard-grid">
                      <Field id="buildings" label="Buildings" hint="In-building services selected.">
                        <input id="buildings" type="text" inputMode="numeric" placeholder="e.g. 3 buildings" {...register('buildings')} />
                      </Field>
                      <Field id="floors" label="Floors" error={errors.floors?.message}>
                        <input id="floors" type="text" inputMode="numeric" placeholder="e.g. 18 floors" {...register('floors')} />
                      </Field>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <Field id="targetStart" label="Target start" required error={errors.targetStart?.message}>
                <Select id="targetStart" options={toOptions(targetStarts)} placeholder="Select a timeframe" {...fieldAria('targetStart', errors.targetStart?.message)} {...register('targetStart')} />
              </Field>
              <Field id="budget" label="Indicative budget (USD)" hint="Optional.">
                <Select id="budget" options={toOptions(budgets)} placeholder="Prefer not to say" {...register('budget')} />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="wizard-grid">
              <Field id="details" label="Project details" required error={errors.details?.message} hint="Scope, number of sites or route, constraints, deadlines." className="form-field--full">
                <Textarea
                  id="details"
                  rows={6}
                  count={(values.details ?? '').length}
                  limit={1500}
                  placeholder="e.g. We are planning a 60-site 5G rollout across two regions. Design is partly done; we need deployment, integration and as-built documentation from Q2."
                  {...fieldAria('details', errors.details?.message)}
                  {...register('details')}
                />
              </Field>
              <Field id="docLink" label="Link to project documents" hint="Optional — a Drive, Dropbox or OneDrive link works while we set up secure file transfer." error={errors.docLink?.message} className="form-field--full">
                <input id="docLink" type="url" inputMode="url" placeholder="https://drive.google.com/…" {...fieldAria('docLink', errors.docLink?.message)} {...register('docLink')} />
              </Field>
              <Field id="referral" label="How did you hear about us?" hint="Optional.">
                <Select id="referral" options={toOptions(referralSources)} placeholder="Select an option" {...register('referral')} />
              </Field>
              <div className="form-field form-field--full wizard-checks">
                <Checkbox id="nda" label="I would like an NDA before sharing project details." {...register('nda')} />
                <Checkbox id="consent" label={<>I agree to be contacted about this enquiry and accept the <Link to="/contact" className="form-link">Privacy Policy</Link>.</>} error={errors.consent?.message} {...register('consent')} />
              </div>
              <div className="form-field form-field--full">
                <button type="button" className="review-toggle" aria-expanded={reviewOpen} onClick={() => setReviewOpen(open => !open)}>
                  Review your enquiry
                  <ChevronDown size={16} strokeWidth={1.75} className={reviewOpen ? 'chevron-open' : ''} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {reviewOpen ? (
                    <motion.div className="review-panel" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                      <dl>
                        <div><dt>Name</dt><dd>{values.fullName || '—'}</dd></div>
                        <div><dt>Company</dt><dd>{values.company || '—'}</dd></div>
                        <div><dt>Email</dt><dd>{values.email || '—'}</dd></div>
                        <div><dt>Phone</dt><dd>{values.phoneNumber ? phoneE164(values.phoneCountry, values.phoneNumber) : '—'}</dd></div>
                        <div><dt>Services</dt><dd>{values.services?.length ? values.services.map(serviceLabel).join(', ') : '—'}</dd></div>
                        <div><dt>Stage</dt><dd>{values.projectStage || '—'}</dd></div>
                        <div><dt>Location</dt><dd>{[values.city, values.region, countryByCode(values.country ?? '')?.name].filter(Boolean).join(', ') || '—'}</dd></div>
                        <div><dt>Target start</dt><dd>{values.targetStart || '—'}</dd></div>
                        <div><dt>NDA</dt><dd>{values.nda ? 'Requested' : 'Not requested'}</dd></div>
                      </dl>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {submitError ? <p className="form-error wizard-error" role="alert">{submitError}</p> : null}
      {status === 'error' && fail ? (
        <div className="wizard-fail" role="alert">
          <p>{fail.message} Your enquiry has not been sent yet.</p>
          <div className="wizard-fail-actions">
            <TKButton onClick={retry}>Retry</TKButton>
            <a className="wizard-fail-mail" href={fail.mailtoHref}>Send via email instead</a>
          </div>
        </div>
      ) : null}

      <footer className="wizard-foot">
        {step > 0 ? (
          <TKButton variant="ghost" onClick={back}>
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" /> Back
          </TKButton>
        ) : <span />}
        {step < STEPS.length - 1 ? (
          <TKButton onClick={next}>
            Next <ArrowLeft size={15} strokeWidth={1.75} className="wizard-next-arrow" aria-hidden="true" />
          </TKButton>
        ) : (
          <TKButton type="submit" className={status === 'submitting' ? 'tk-button--loading' : ''} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Discuss Your Project'}
          </TKButton>
        )}
      </footer>
    </form>
  );
}
