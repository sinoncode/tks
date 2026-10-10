import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modalSchema, type ModalFormValues } from '@/lib/enquirySchema';
import { buildEnquiryBody, submitEnquiry, type SubmitFailure } from '@/lib/submitEnquiry';
import { Field, fieldAria } from '@/components/forms/field';
import { Select, toOptions } from '@/components/forms/select';
import { Textarea } from '@/components/forms/textarea';
import { Checkbox } from '@/components/forms/checkbox';
import { ChipSelect } from '@/components/forms/chip-select';
import { PhoneField, detectPhoneCountry, phoneE164 } from '@/components/forms/phone-field';
import { TKButton } from '@/components/ui/tk-button';
import { SwooshCheck } from '@/components/contact/success';
import { countries, countryByCode } from '@/data/countries';
import {
  isFreeMail,
  modalContactMethods,
  organisationTypes,
  projectStages,
  serviceLabel,
  serviceOptions,
  targetStarts,
} from '@/data/formOptions';
import { site } from '@/data/site';
import type { EnquiryModalOptions } from '@/components/enquiry/context';

const countryOptions = countries.map(country => ({ value: country.code, label: country.name }));

/** Compact single-scroll enquiry form used inside the global modal. */
export function EnquiryModalForm({
  options,
  onClose,
  onDirtyChange,
}: {
  options: EnquiryModalOptions;
  onClose: () => void;
  onDirtyChange: (dirty: boolean) => void;
}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [fail, setFail] = useState<SubmitFailure | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [hidden, setHidden] = useState({ pageUrl: '', utmSource: '', utmMedium: '', utmCampaign: '' });
  const startedAt = useRef(0);
  const submitting = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm<ModalFormValues>({
    resolver: zodResolver(modalSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: typeof options.prefill?.fullName === 'string' ? options.prefill.fullName : '',
      email: typeof options.prefill?.email === 'string' ? options.prefill.email : '',
      phoneCountry: 'US',
      phoneNumber: '',
      company: typeof options.prefill?.company === 'string' ? options.prefill.company : '',
      orgType: '',
      services: options.service ? [options.service] : [],
      country: '',
      city: '',
      projectStage: '',
      targetStart: '',
      description: '',
      contactMethod: 'Email',
      nda: false,
      consent: false,
      company_website: '',
    },
  });

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    startedAt.current = Date.now();
    setValue('phoneCountry', detectPhoneCountry(), { shouldValidate: false });
    const params = new URLSearchParams(window.location.search);
    setHidden({
      pageUrl: window.location.href,
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
    });
  }, [setValue]);

  const values = watch();
  const emailHint =
    !errors.email && values.email && isFreeMail(values.email)
      ? 'A work email helps us route your enquiry faster — but a personal address works too.'
      : undefined;

  const onSubmit = async (form: ModalFormValues) => {
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
    const sections: (readonly [string, string])[] = [
      ['Full name', form.fullName],
      ['Email', form.email],
      ['Phone / WhatsApp (E.164)', e164],
      ['Company / organisation', form.company],
      ['Organisation type', form.orgType],
      ['Services needed', form.services.map(serviceLabel).join(', ')],
      ['Project location', [form.city, countryByCode(form.country)?.name].filter(Boolean).join(', ')],
      ['Project stage', form.projectStage],
      ['Target start', form.targetStart],
      ['Brief description', form.description],
      ['Preferred contact method', form.contactMethod],
      ['NDA requested', form.nda ? 'Yes' : 'No'],
    ];
    const subject = `New enquiry - ${serviceLabel(form.services[0] ?? '')} - ${form.company}`;
    const fields: Record<string, string> = {
      ...Object.fromEntries(sections),
      consent: 'true',
      source: options.source,
      service: form.services.join(', '),
      pageUrl: hidden.pageUrl,
      utmSource: hidden.utmSource,
      utmMedium: hidden.utmMedium,
      utmCampaign: hidden.utmCampaign,
      timestamp: new Date().toISOString(),
    };

    const result = await submitEnquiry({
      to: site.contact.email,
      subject,
      body: buildEnquiryBody(sections),
      fields,
    });
    submitting.current = false;
    if (result.ok) {
      setStatus('success');
      onDirtyChange(false);
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

  const goFullForm = () => {
    navigate('/contact', { state: { enquiry: getValues() } });
    onClose();
  };

  if (status === 'success') {
    const form = getValues();
    const firstName = form.fullName.trim().split(/\s+/)[0] || form.fullName;
    return (
      <div className="modal-success">
        <SwooshCheck />
        <h3>
          Thank you, {firstName}
          <span className="period">.</span>
        </h3>
        <p>Our team will review your enquiry and get back to you.</p>
        <TKButton onClick={onClose}>Close</TKButton>
      </div>
    );
  }

  return (
    <form className="modal-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        id="modal_company_website"
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register('company_website')}
      />

      <div className="modal-group">
        <h4>About you</h4>
        <Field id="modal-fullName" label="Full name" required error={errors.fullName?.message}>
          <input id="modal-fullName" type="text" autoComplete="name" placeholder="e.g. Amara Okafor" {...fieldAria('modal-fullName', errors.fullName?.message)} {...register('fullName')} />
        </Field>
        <Field id="modal-email" label="Work email" required error={errors.email?.message} hint={emailHint}>
          <input id="modal-email" type="email" inputMode="email" autoComplete="email" placeholder="e.g. amara@meridiantel.com" {...fieldAria('modal-email', errors.email?.message)} {...register('email')} />
        </Field>
        <Field id="modal-phoneNumber" label="Phone / WhatsApp" required error={errors.phoneNumber?.message ?? errors.phoneCountry?.message}>
          <Controller
            name="phoneCountry"
            control={control}
            render={({ field }) => (
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: number }) => (
                  <PhoneField
                    id="modal-phoneNumber"
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
        <Field id="modal-company" label="Company / organisation" required error={errors.company?.message}>
          <input id="modal-company" type="text" autoComplete="organization" placeholder="e.g. Meridian Telecom" {...fieldAria('modal-company', errors.company?.message)} {...register('company')} />
        </Field>
        <Field id="modal-orgType" label="Organisation type" required error={errors.orgType?.message}>
          <Select id="modal-orgType" options={organisationTypes.map(value => ({ value, label: value }))} placeholder="Select your organisation type" {...fieldAria('modal-orgType', errors.orgType?.message)} {...register('orgType')} />
        </Field>
      </div>

      <div className="modal-group">
        <h4>Your project</h4>
        <Field id="modal-services" label="Service needed" required error={errors.services?.message}>
          <ChipSelect
            ariaLabel="Service needed"
            multi
            options={serviceOptions.map(option => ({ value: option.value, label: option.label }))}
            value={values.services ?? []}
            onChange={selected => setValue('services', selected, { shouldValidate: true })}
          />
        </Field>
        <div className="modal-row">
          <Field id="modal-country" label="Country" required error={errors.country?.message}>
            <Select id="modal-country" autoComplete="country-name" options={countryOptions} placeholder="Select a country" {...fieldAria('modal-country', errors.country?.message)} {...register('country')} />
          </Field>
          <Field id="modal-city" label="City" required error={errors.city?.message}>
            <input id="modal-city" type="text" autoComplete="address-level2" placeholder="e.g. Ikeja" {...fieldAria('modal-city', errors.city?.message)} {...register('city')} />
          </Field>
        </div>
        <Field id="modal-projectStage" label="Project stage" required error={errors.projectStage?.message}>
          <Select id="modal-projectStage" options={toOptions(projectStages)} placeholder="Select your project stage" {...fieldAria('modal-projectStage', errors.projectStage?.message)} {...register('projectStage')} />
        </Field>
        <Field id="modal-targetStart" label="Target start" error={errors.targetStart?.message}>
          <Select id="modal-targetStart" options={toOptions(targetStarts)} placeholder="Select a timeframe" {...register('targetStart')} />
        </Field>
        <Field id="modal-description" label="Brief description" required error={errors.description?.message} hint="Scope, sites or route, constraints, deadlines.">
          <Textarea
            id="modal-description"
            rows={4}
            count={(values.description ?? '').length}
            limit={600}
            placeholder="e.g. We need route engineering and construction for ~40 km of aerial fibre, starting next quarter."
            {...fieldAria('modal-description', errors.description?.message)}
            {...register('description')}
          />
        </Field>
      </div>

      <div className="modal-group">
        <h4>Preferences</h4>
        <Field id="modal-contactMethod" label="Preferred contact method" error={errors.contactMethod?.message}>
          <div id="modal-contactMethod" className="segmented" role="radiogroup" aria-label="Preferred contact method">
            {modalContactMethods.map(method => (
              <button key={method} type="button" role="radio" aria-checked={values.contactMethod === method} className={values.contactMethod === method ? 'is-active' : ''} onClick={() => setValue('contactMethod', method, { shouldValidate: true })}>
                {method}
              </button>
            ))}
          </div>
        </Field>
        <Checkbox id="modal-nda" label="I would like an NDA before sharing details." {...register('nda')} />
        <Checkbox id="modal-consent" label="I agree to be contacted about this enquiry and accept the Privacy Policy." error={errors.consent?.message} {...register('consent')} />
      </div>

      {submitError ? <p className="form-error modal-error" role="alert">{submitError}</p> : null}
      {status === 'error' && fail ? (
        <div className="wizard-fail modal-fail" role="alert">
          <p>{fail.message} Your enquiry has not been sent yet.</p>
          <div className="wizard-fail-actions">
            <TKButton onClick={retry}>Retry</TKButton>
            <a className="wizard-fail-mail" href={fail.mailtoHref}>Send via email instead</a>
          </div>
        </div>
      ) : null}

      <footer className="modal-form-foot">
        <TKButton type="submit" className={status === 'submitting' ? 'tk-button--loading' : ''} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Discuss Your Project'}
        </TKButton>
        <button type="button" className="modal-form-alt" onClick={goFullForm}>
          Prefer the full form? Go to the Contact page
        </button>
      </footer>
    </form>
  );
}
