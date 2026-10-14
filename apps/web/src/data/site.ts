export const site = {
  name: 'TechnoKraft',
  fullName: 'TechnoKraft - Telecommunications Infrastructure',
  tagline: 'Survey → Design → Build → Integrate → Optimise',
  positioning: 'Engineering and infrastructure for connected networks. One accountable program from the first field survey to the final optimised network.',
  lifecycle: ['Survey', 'Design', 'Build', 'Integrate', 'Optimise'] as const,
  references: [
    { label: '3GPP', href: 'https://www.3gpp.org/' },
    { label: 'IEEE', href: 'https://www.ieee.org/' },
    { label: 'ETSI', href: 'https://www.etsi.org/' },
  ],
  /** Direct contact channels shown next to the forms. */
  contact: {
    email: 'upendra@tks-us.com',
    phones: ['(405) 469 676 6531'] as const,
    address: '1303 W. Suite Number: 130, Walnut Hill, Irving TX 75038',
    note: 'Prefer email? Write to us directly and attach any project documents.',
  },
  /** Social profile URLs — leave a value empty to hide that footer button. */
  socials: {
    linkedin: '',
    x: '',
    youtube: '',
    facebook: '',
  } as const,
  /** Reasons listed on the enquiry modal brand pane. */
  modalReasons: [
    'One accountable program',
    'Engineering + construction under one team',
    'Quality documentation',
  ] as const,
  /** Optional scroll-60% nudge for the floating action button. Off by default. */
  showNudge: false,
} as const;
