import { Facebook, Linkedin, Twitter, Youtube, type LucideIcon } from 'lucide-react';
import { services } from '@/data/services';
import { site } from '@/data/site';

export type FooterLinkItem = {
  label: string;
  href: string;
  /** Outbound reference link — opens in a new tab. */
  external?: boolean;
  /** Optional lucide icon shown in a tiny navy circle (service links). */
  icon?: LucideIcon;
};

export type FooterColumnData = {
  id: string;
  heading: string;
  links: FooterLinkItem[];
};

export type FooterSocial = { network: string; href: string; icon: LucideIcon };

/** CTA band copy. */
export const footerCTA = {
  heading: 'Planning a Network Build?',
  line: "Tell us what you're building. We'll help scope the engineering, deployment and delivery requirements.",
} as const;

/** Brand column copy. */
export const footerBrand = {
  intro: 'Telecommunications infrastructure — from field survey and engineering design to construction, integration and optimisation.',
} as const;

/** Social buttons — hidden while the URLs in site.ts are empty. */
export const footerSocials: FooterSocial[] = [
  { network: 'LinkedIn', href: site.socials.linkedin, icon: Linkedin },
  { network: 'X', href: site.socials.x, icon: Twitter },
  { network: 'YouTube', href: site.socials.youtube, icon: Youtube },
  { network: 'Facebook', href: site.socials.facebook, icon: Facebook },
].filter(social => social.href);

/** The four link columns (brand column is rendered separately). */
export const footerColumns: FooterColumnData[] = [
  {
    id: 'services',
    heading: 'Services',
    links: services.map(service => ({
      label: service.title,
      href: `/services/${service.slug}`,
      icon: service.icon,
    })),
  },
  {
    id: 'company',
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Industries', href: '/industries' },
      { label: 'Projects', href: '/projects' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    id: 'industries',
    heading: 'Industries',
    links: [
      { label: 'Telecommunications', href: '/industries#industry-telecommunications' },
      { label: 'Network Equipment & OEMs', href: '/industries#industry-network-equipment-oems' },
      { label: 'Tower & Infrastructure', href: '/industries#industry-tower-infrastructure' },
      { label: 'Fibre & Broadband', href: '/industries#industry-fibre-broadband' },
      { label: 'Enterprise & Data Centres', href: '/industries#industry-enterprise-data-centres' },
    ],
  },
  {
    id: 'references',
    heading: 'Technical references',
    links: site.references.map(reference => ({
      label: reference.label,
      href: reference.href,
      external: true,
    })),
  },
];

/** Stages for the compact lifecycle mini graphic in the references column. */
export const footerLifecycle = ['Survey', 'Design', 'Build', 'Integrate', 'Optimise'] as const;

/** Outlined marquee text. */
export const footerTagline = 'NETWORKING | SOLUTIONS | CONNECTIVITY';

/** Bottom-bar legal links. */
export const footerLegal: FooterLinkItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];
