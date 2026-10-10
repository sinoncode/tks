/** Technical capabilities tab panels for the Services overview page. */

export type CapabilityTab = {
  id: string;
  label: string;
  chips: string[];
};

export const capabilityTabs: CapabilityTab[] = [
  {
    id: 'wireless',
    label: 'Wireless',
    chips: ['LTE', '5G NR', 'RF Planning', 'Capacity Planning', 'Coverage Analysis', 'Drive Testing', 'KPI Benchmarking'],
  },
  {
    id: 'rf',
    label: 'RF',
    chips: ['Propagation Modelling', 'Link Budget Analysis', 'Frequency Planning', 'Antenna Selection', 'Azimuth & Tilt Optimisation', 'Interference Mitigation'],
  },
  {
    id: 'fibre',
    label: 'Fibre',
    chips: ['Underground Construction', 'Directional Boring', 'Trenching', 'Aerial Construction', 'Fibre Splicing', 'Fibre Termination'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    chips: ['Pole Loading', 'Make-Ready Engineering', 'Permit Drawings', 'GIS Mapping', 'Jurisdictional Coordination', 'As-Built Documentation'],
  },
  {
    id: 'indoor',
    label: 'Indoor Connectivity',
    chips: ['DAS', 'Small Cells', 'In-Building RF Surveys'],
  },
];
