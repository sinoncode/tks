import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { countryByCode } from '@/data/countries';
import {
  bestTimes,
  budgets,
  contactMethods,
  modalContactMethods,
  organisationTypes,
  projectStages,
  referralSources,
  targetStarts,
} from '@/data/formOptions';

/** Membership-checked string — works the same across zod versions. */
const oneOf = (values: readonly string[], message: string) =>
  z.string().refine(value => (values as readonly string[]).includes(value), { message });

const requiredEmail = z.email('Enter a valid email address.');

/** Shared phone validation — attaches issues to `phoneNumber`. */
const phoneRefine = <T extends { phoneCountry: string; phoneNumber: string }>(
  value: T,
  ctx: z.RefinementCtx,
) => {
  const country = countryByCode(value.phoneCountry);
  const full = `+${country?.dial ?? ''}${value.phoneNumber}`;
  if (value.phoneNumber && !isValidPhoneNumber(full)) {
    ctx.addIssue({
      code: 'custom',
      path: ['phoneNumber'],
      message: 'Enter a valid phone number for the selected country.',
    });
  }
};

const consentField = z
  .boolean()
  .refine(value => value === true, { message: 'You must agree to be contacted to submit this enquiry.' });

const ndaField = z.boolean();

/** Full contact-page wizard schema (all three steps). */
export const contactSchema = z
  .object({
    // Step 1 — About you
    fullName: z.string().min(2, 'Enter your full name.'),
    jobTitle: z.string().optional(),
    company: z.string().min(2, 'Enter your company or organisation.'),
    orgType: oneOf(organisationTypes, 'Select your organisation type.'),
    email: requiredEmail,
    phoneCountry: z.string().min(1, 'Select a country code.'),
    phoneNumber: z.string().min(5, 'Enter your phone or WhatsApp number.'),
    contactMethod: oneOf(contactMethods, 'Select a preferred contact method.'),
    bestTime: oneOf(bestTimes, 'Select the best time to reach you.'),
    // Step 2 — Your project
    services: z.array(z.string()).min(1, 'Select at least one service.'),
    technologies: z.array(z.string()),
    projectStage: oneOf(projectStages, 'Select your project stage.'),
    country: z.string().min(1, 'Select the project country.'),
    region: z.string().optional(),
    city: z.string().min(2, 'Enter the city or area.'),
    sites: z.string().optional(),
    routeLength: z.string().optional(),
    routeUnit: z.enum(['km', 'miles']),
    buildings: z.string().optional(),
    floors: z.string().optional(),
    targetStart: oneOf(targetStarts, 'Select a target start.'),
    budget: oneOf(budgets, 'Select a budget range or "Prefer not to say".').optional(),
    // Step 3 — Details & confirmation
    details: z
      .string()
      .min(30, 'Tell us a little more — at least 30 characters.')
      .max(1500, 'Keep the details under 1500 characters.'),
    docLink: z
      .string()
      .refine(value => !value || /^https?:\/\/.+\..+/.test(value), {
        message: 'Enter a valid link (starting with http:// or https://).',
      })
      .optional(),
    referral: oneOf(referralSources, 'Select an option.').optional(),
    nda: ndaField,
    consent: consentField,
    // Honeypot — must stay empty; handled at submit time.
    company_website: z.string().optional(),
  })
  .superRefine(phoneRefine);

/** Compact enquiry-modal schema. */
export const modalSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name.'),
    email: requiredEmail,
    phoneCountry: z.string().min(1, 'Select a country code.'),
    phoneNumber: z.string().min(5, 'Enter your phone or WhatsApp number.'),
    company: z.string().min(2, 'Enter your company or organisation.'),
    orgType: oneOf(organisationTypes, 'Select your organisation type.'),
    services: z.array(z.string()).min(1, 'Select at least one service.'),
    country: z.string().min(1, 'Select the project country.'),
    city: z.string().min(2, 'Enter the city or area.'),
    projectStage: oneOf(projectStages, 'Select your project stage.'),
    targetStart: oneOf(targetStarts, 'Select a target start.'),
    description: z
      .string()
      .min(20, 'A sentence or two helps — at least 20 characters.')
      .max(600, 'Keep the description under 600 characters.'),
    contactMethod: oneOf(modalContactMethods, 'Select a preferred contact method.'),
    nda: ndaField,
    consent: consentField,
    company_website: z.string().optional(),
  })
  .superRefine(phoneRefine);

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ModalFormValues = z.infer<typeof modalSchema>;

/** Field groups per wizard step — used by trigger() and focus-first-invalid. */
export const contactStepFields = [
  [
    'fullName',
    'jobTitle',
    'company',
    'orgType',
    'email',
    'phoneCountry',
    'phoneNumber',
    'contactMethod',
    'bestTime',
  ],
  [
    'services',
    'technologies',
    'projectStage',
    'country',
    'region',
    'city',
    'sites',
    'routeLength',
    'routeUnit',
    'buildings',
    'floors',
    'targetStart',
    'budget',
  ],
  ['details', 'docLink', 'referral', 'nda', 'consent'],
] as const;
