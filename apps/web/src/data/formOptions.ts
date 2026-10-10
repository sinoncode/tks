import { HelpCircle, type LucideIcon } from 'lucide-react';
import { services } from '@/data/services';

/** Organisation types — shared by the contact form and the enquiry modal. */
export const organisationTypes = [
  'Wireless carrier / Telecom operator',
  'Tower company / Infrastructure owner',
  'Network equipment vendor / OEM',
  'Fibre / Broadband operator',
  'Enterprise / Data centre',
  'Government / Municipality',
  'Contractor / Integrator',
  'Other',
] as const;

/** Services offered in the forms — the six disciplines plus an advisory option. */
export type ServiceOption = { value: string; label: string; icon: LucideIcon };

export const serviceOptions: ServiceOption[] = [
  ...services.map(service => ({ value: service.slug, label: service.title, icon: service.icon })),
  { value: 'not-sure', label: 'Not sure yet — advise me', icon: HelpCircle },
];

export const serviceLabel = (value: string) =>
  serviceOptions.find(option => option.value === value)?.label ?? value;

/** Service slugs that drive each conditional project-scale field group. */
export const wirelessServiceSlugs = [
  'network-deployment-rollout',
  'network-design-optimisation',
  'rf-engineering',
] as const;

export const fibreServiceSlugs = ['fibre-construction', 'fibre-engineering-survey'] as const;

export const inBuildingServiceSlugs = ['in-building-solutions-small-cells'] as const;

export const scaleGroupsForServices = (slugs: string[]) => ({
  sites: slugs.some(slug => (wirelessServiceSlugs as readonly string[]).includes(slug)),
  route: slugs.some(slug => (fibreServiceSlugs as readonly string[]).includes(slug)),
  buildings: slugs.some(slug => (inBuildingServiceSlugs as readonly string[]).includes(slug)),
});

export const technologyOptions = [
  'LTE',
  '5G NR',
  'Legacy technologies',
  'DAS',
  'Small Cells',
  'Fibre (underground)',
  'Fibre (aerial)',
  'GIS / Survey',
  'Other',
] as const;

export const projectStages = [
  'Early planning',
  'Design / engineering needed',
  'Ready to build',
  'Existing network needs optimisation',
  'Documentation / as-built',
] as const;

export const targetStarts = [
  'ASAP',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Just exploring',
] as const;

export const budgets = [
  'Under $50k',
  '$50k-$250k',
  '$250k-$1M',
  '$1M+',
  'Prefer not to say',
] as const;

export const contactMethods = ['Email', 'Phone call', 'WhatsApp', 'Video meeting'] as const;

export const modalContactMethods = ['Email', 'Phone call', 'WhatsApp'] as const;

export const bestTimes = ['Morning', 'Afternoon', 'Evening'] as const;

export const referralSources = [
  'Search engine',
  'Referral from a colleague',
  'Industry event or conference',
  'Social media',
  'Direct outreach',
  'Other',
] as const;

/** Free-mail domains — surfaced as a soft hint only, never blocking. */
export const freeMailDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'yandex.com',
  'zoho.com',
  'live.com',
] as const;

export const isFreeMail = (email: string) =>
  freeMailDomains.some(domain => email.toLowerCase().endsWith(`@${domain}`));
