import {
  Cable, Route, MapPinned, Map, Network, Ruler, ClipboardCheck, FileCheck, FileText, Layers, Search, ShieldCheck, Building2, RadioTower, Home, Server, GitBranch, ChartNoAxesCombined, Calculator, HardHat, CheckCircle2, Workflow, Target, Database, Compass, MapPin, DraftingCompass,
  ClipboardList, Lightbulb, SlidersHorizontal, Activity, Radar, Gauge, BriefcaseBusiness, Hospital, Users, TrainFront, ShoppingBag, Warehouse, Wrench, Signal, Radio, Drill, Construction, Trees, Settings2, Hammer, Zap,
  RefreshCw, SearchCheck, CalendarRange, Antenna,
  type LucideIcon
} from "lucide-react";

export type LifecycleStageName = 'Survey' | 'Design' | 'Build' | 'Integrate' | 'Optimise';

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceHighlightCard = {
  id?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
};

export type ServiceCustomSection =
  | {
    kind?: 'info';
    id?: string;
    title: string;
    description: string;
    bullets?: string[];
  }
  | {
    kind: 'faq';
    id?: string;
    title: string;
    description?: string;
    items: ServiceFaqItem[];
  }
  | {
    kind: 'cards';
    id?: string;
    title: string;
    description?: string;
    cards: ServiceHighlightCard[];
  };

export type Service = {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  url?: string;
  intro: string | { heading: string; description: string };
  tags: string[];
  icon: LucideIcon;
  stages: (LifecycleStageName | { title: string; description: string; icon: LucideIcon })[];
  deliverables: (string | { title: string; description: string; icon: LucideIcon })[];
  customSections?: ServiceCustomSection[];
  rolloutProcess?: { id?: string; step?: string; title: string; description: string; icon?: LucideIcon }[];
  optimisationProcess?: { id?: string; step?: string; title: string; description: string; icon?: LucideIcon }[];
  rfEngineeringProcess?: { id?: string; step?: string; title: string; description: string; icon?: LucideIcon }[];
  inBuildingProcess?: { id?: string; step?: string; title: string; description: string; icon?: LucideIcon }[];
  surveyCapabilities?: { id?: string; title: string; description: string; icon?: LucideIcon }[];
  networkTypes?: { id?: string; title: string; description: string; technologies?: string[]; icon?: LucideIcon; tags?: string[] }[];
  benefits?: { title: string; description: string; icon?: LucideIcon }[];
  outcomes?: { title: string; description: string; icon?: LucideIcon }[];
  rfChallenges?: { id?: string; title: string; description: string; icon?: LucideIcon; tags?: string[] }[];
  technicalConsiderations?: { title: string; description: string; icon?: LucideIcon }[];
  cta?: { title?: string; headline?: string; description: string; buttonText: string; href?: string; buttonLink?: string };
  technologies: string[];
  related: string[];
  [key: string]: any; // Allow any other ad-hoc properties added by user
};

export const services: Service[] = [
  {
    slug: "network-deployment-rollout",

    title: "Network Deployment & Rollout",

    description:
      "End-to-end network deployment services, from site acquisition and civil works to equipment installation, commissioning, testing, and handover.",

    metaTitle: "Network Deployment & Rollout Services | Networsys",

    metaDescription:
      "Networsys delivers end-to-end network deployment and rollout, from site acquisition and civil works to installation, commissioning, and handover.",

    keywords: [
      "network deployment services",
      "network rollout",
      "telecom rollout programme management",
      "site commissioning",
      "5G rollout",
    ],

    intro:
      "A network is only as good as the way it is built. Design documents and capacity plans mean little until antennas are mounted, cables are terminated, power is live, and traffic is flowing. Networsys delivers network deployment and rollout programmes that turn approved designs into working infrastructure, safely and on schedule, with the documentation your operations team needs afterwards. Whether you are expanding mobile coverage, densifying a 5G layer, connecting a new fibre backbone, or modernising legacy equipment, we manage the full path from the first site list to the final acceptance certificate.",

    tags: [
      "Network Deployment",
      "Telecom Rollout",
      "Programme Management",
      "5G Infrastructure",
    ],

    icon: RadioTower,

    stages: ["Build", "Integrate"],

    deliverables: [
      "Site acquisition, planning support, and permitting",
      "Civil works and structural assessments",
      "Equipment installation, cabling, and power systems",
      "Transmission connectivity and backhaul integration",
      "Commissioning, integration, and acceptance testing",
      "Technology refresh and equipment swap programmes",
      "Safety, quality assurance, and close-out documentation",
    ],
    customSections: [
      {
        kind: "info",

        id: "deployment-overview",

        title: "What Network Deployment and Rollout Really Involves",

        description:
          "Network rollout involves much more than installing equipment. It is a coordinated chain of activities, including site acquisition, planning and permitting, structural assessment, civil works, power installation, equipment deployment, transmission connectivity, commissioning, integration, acceptance testing, and documentation. Every stage depends on the successful completion of the previous one, making coordination essential to keeping a programme on schedule.\n\nNetworsys approaches deployment as a managed programme rather than a series of unrelated site visits. For multi-site rollouts, we establish consistent workflows, quality checkpoints, progress tracking, and clear communication between customers, landlords, authorities, vendors, and delivery teams. This helps identify constraints early and maintain consistent delivery standards as the programme scales.",
      },

      {
        kind: "info",

        id: "safety-quality-compliance",

        title: "Safety, Quality and Compliance at Every Stage",

        description:
          "Telecommunications deployment can involve working at height, around live electrical systems, and in public spaces. Networsys incorporates safety into deployment planning from the outset, with documented risk assessments, trained and competent personnel, appropriate protective equipment, and clear stop-work procedures when unsafe conditions arise.\n\nQuality is maintained through structured checklists, photographic evidence, and inspections at key stages of the deployment. Environmental considerations, including waste handling, noise limits, and site reinstatement, are included in programme planning. By maintaining clear records and consistent quality controls, we help ensure that completed sites meet agreed requirements and are ready for operational handover.",

        bullets: [
          "Documented risk assessments and site safety procedures",
          "Quality checklists, photographic evidence, and inspections",
          "Environmental considerations and site reinstatement",
          "Consistent installation standards and acceptance criteria",
        ],
      },

      {
        kind: "faq",

        id: "deployment-faq",

        title: "Frequently Asked Questions",

        description:
          "Find answers to common questions about network deployment, rollout planning, commissioning, and service continuity.",

        items: [
          {
            question: "How long does a typical site rollout take?",

            answer:
              "The timeline depends on the site type, permitting requirements, civil works, and equipment lead times. A straightforward equipment upgrade may take days on site, while a new-build site can take months when acquisition and planning are included. We establish a programme-specific schedule after reviewing your site list and delivery requirements.",
          },

          {
            question:
              "Can you manage rollout programmes with many sites at once?",

            answer:
              "Yes. We organise large programmes into delivery waves with standard workflows, defined quality checkpoints, and consistent progress reporting. Sites can be grouped geographically to improve resource allocation and delivery efficiency, while lessons from early deployments help refine subsequent waves.",
          },

          {
            question:
              "Do you provide commissioning and testing, or only installation?",

            answer:
              "Our deployment scope covers both installation and commissioning activities. This can include power-up checks, alarm verification, configuration loading, transmission turn-up, service validation, acceptance testing, and the documentation required for operational handover.",
          },

          {
            question:
              "How do you reduce service disruption on live networks?",

            answer:
              "We plan changes around agreed maintenance windows, prepare detailed method statements, and establish rollback procedures before work begins. Deployment activities are sequenced to minimise the part of the network affected at any one time and help protect existing services during equipment upgrades and technology refresh programmes.",
          },
        ],
      },

      {
        kind: "cards",

        id: "deployment-capabilities",

        title: "End-to-End Network Deployment Services",

        description:
          "From site readiness to operational handover, our deployment capabilities cover the essential activities required to turn approved network designs into working infrastructure.",

        cards: [
          {
            id: "site-acquisition",

            title: "Site Acquisition & Permitting",

            description:
              "Support candidate site selection, landlord engagement, planning submissions, access agreements, and permit tracking to help ensure sites are ready for construction.",

            icon: MapPinned,

            tags: ["Planning", "Permits", "Site Readiness"],
          },

          {
            id: "civil-structural",

            title: "Civil & Structural Works",

            description:
              "Coordinate foundations, equipment bases, cable routes, ducting, shelters, and cabinets. Arrange structural assessments when existing structures are reused.",

            icon: Construction,

            tags: ["Civil Works", "Infrastructure", "Structural Checks"],
          },

          {
            id: "equipment-installation",

            title: "Equipment Installation & Cabling",

            description:
              "Install antennas, radio units, baseband equipment, power systems, transmission links, grounding, lightning protection, and cable management according to approved designs.",

            icon: Cable,

            tags: ["Installation", "Cabling", "Power Systems"],
          },

          {
            id: "commissioning-integration",

            title: "Commissioning & Integration",

            description:
              "Perform power-up checks, alarm verification, configuration loading, transmission turn-up, and service validation before proceeding with agreed acceptance testing.",

            icon: Workflow,

            tags: ["Commissioning", "Integration", "Testing"],
          },

          {
            id: "technology-refresh",

            title: "Technology Refresh & Upgrades",

            description:
              "Coordinate equipment swaps and network modernisation around agreed maintenance windows, with sequenced activities and rollback procedures to help protect live services.",

            icon: RefreshCw,

            tags: ["Modernisation", "Equipment Swaps", "Continuity"],
          },

          {
            id: "quality-handover",

            title: "Quality Assurance & Handover",

            description:
              "Maintain quality checklists, inspection records, photographs, as-built drawings, equipment serial numbers, and configuration records for a structured operational handover.",

            icon: ClipboardCheck,

            tags: ["Quality", "Documentation", "Acceptance"],
          },
        ],
      },
    ],

    /**
     * ROLLOUT PROGRAMME
     *
     * A separate data-driven process strip.
     * Render it outside customSections if your page supports this field.
     */

    rolloutProcess: [
      {
        id: "discovery",

        step: "01",

        title: "Discovery & Baseline",

        description:
          "Review site lists, approved designs, delivery constraints, and programme targets. Identify risks early, including access restrictions, structural uncertainties, permit lead times, and power capacity limitations.",

        icon: SearchCheck,
      },

      {
        id: "planning",

        step: "02",

        title: "Programme Planning",

        description:
          "Establish milestones, allocate resources, review material lead times, and map dependencies. Group sites into delivery waves to improve coordination and apply lessons from early deployments.",

        icon: CalendarRange,
      },

      {
        id: "execution",

        step: "03",

        title: "Controlled Execution",

        description:
          "Follow standard site workflows with defined quality checkpoints, method statements, risk assessments, and safety briefings. Track progress through a shared status view.",

        icon: HardHat,
      },

      {
        id: "handover",

        step: "04",

        title: "Testing & Handover",

        description:
          "Compile acceptance data, as-built drawings, photographs, equipment serial numbers, and configuration records. Close identified defects and prepare the documentation needed for operational handover.",

        icon: FileCheck,
      },
    ],

    /**
     * NETWORK TYPES
     */

    networkTypes: [
      {
        id: "mobile-ran",

        title: "Mobile Radio Access Networks",

        description:
          "Support macro sites, rooftop installations, and street-level deployments, including 4G and 5G new builds, additional sectors, spectrum layer additions, and antenna upgrades.",

        technologies: ["4G", "5G", "Mobile RAN", "Antenna Upgrades"],
      },

      {
        id: "fibre-transmission",

        title: "Fibre & Transmission Networks",

        description:
          "Deploy backbone, aggregation, and access fibre infrastructure supporting mobile and fixed services, working alongside fibre construction and engineering teams where physical routes are involved.",

        technologies: [
          "Fibre Backbones",
          "Access Networks",
          "Transmission",
          "Backhaul",
        ],
      },

      {
        id: "enterprise-venue",

        title: "Enterprise & Venue Networks",

        description:
          "Deploy private and shared coverage systems for campuses, hospitals, transport hubs, and commercial buildings, with delivery adapted to the requirements of each environment.",

        technologies: [
          "Enterprise Networks",
          "Indoor Coverage",
          "Private Networks",
          "Small Cells",
        ],
      },
    ],

    /**
     * TECHNOLOGIES AND DELIVERY CAPABILITIES
     */

    technologies: [
      "4G & 5G Rollout",
      "Mobile Radio Access Networks",
      "Fibre & Transmission",
      "Enterprise Networks",
      "Turnkey Site Deployment",
      "Equipment Modernisation",
      "Commissioning & Integration",
      "Acceptance Testing",
    ],

    /**
     * WHY NETWORSYS
     */

    benefits: [
      {
        title: "Single Point of Accountability",

        description:
          "Coordinate civil works, equipment installation, transmission, and testing through one managed delivery approach.",
      },

      {
        title: "Design-Aware Delivery",

        description:
          "Align field execution with approved designs and identify site constraints before they develop into delivery issues.",
      },

      {
        title: "Transparent Programme Reporting",

        description:
          "Maintain regular progress updates and site-level status information throughout the rollout programme.",
      },

      {
        title: "Scalable Delivery Resources",

        description:
          "Organise deployment teams and specialist resources to support programmes as site volumes and delivery requirements grow.",
      },

      {
        title: "Structured Operational Handover",

        description:
          "Provide organised acceptance records and technical documentation to support operations and maintenance teams.",
      },
    ],

    /**
     * FINAL CALL TO ACTION
     */

    cta: {
      title: "Turn Your Network Design into a Live Network.",

      description:
        "Share your site list or programme scope with Networsys. Our team will review your deployment requirements and discuss a suitable delivery approach and timeline.",

      buttonText: "Talk to Our Deployment Team",

      href: "/contact",
    },

    related: [
      "network-design-optimisation",
      "fibre-construction",
      "in-building-solutions-small-cells",
    ],
  },
  {
    slug: "network-design-optimisation",

    title: "Network Design & Optimisation",

    description:
      "Telecom network design and optimisation covering capacity planning, coverage analysis, performance tuning, and continuous improvement for mobile and fixed networks.",

    // SEO metadata
    metaTitle: "Network Design & Optimisation Services | Networsys",

    metaDescription:
      "Networsys provides telecom network design and optimisation, covering capacity planning, coverage analysis, performance tuning and ongoing improvement for mobile and fixed networks.",

    keywords: [
      "network design and optimisation",
      "network planning",
      "capacity planning",
      "5G network optimisation",
      "drive test analysis",
    ],

    intro:
      "Every network begins as a set of decisions: where to place equipment, which technologies to use, how much capacity to provide, and how traffic will flow. Those decisions determine cost, user experience, and future flexibility. Networsys provides network design and optimisation services that help operators, infrastructure owners, and enterprises build networks that perform well on day one and continue to perform as demand changes. Our approach connects two disciplines that are often treated separately. Good design reduces the need for corrective work later, while optimisation feeds real-world evidence back into future design decisions.",

    tags: [
      "Network Planning",
      "Capacity Planning",
      "Performance Optimisation",
      "5G Networks",
    ],

    icon: Network,

    stages: ["Design", "Optimise"],

    // Primary service deliverables
    deliverables: [
      "Network requirements analysis and planning strategy",
      "Coverage prediction and capacity planning",
      "High-level and low-level network design",
      "Transmission and backhaul architecture",
      "Network architecture and resilience reviews",
      "Performance baselining and benchmarking",
      "Drive testing and walk testing",
      "Radio parameter and feature optimisation",
      "Antenna and physical network optimisation",
      "Capacity and congestion management",
      "Automation and self-organising network support",
    ],

    // Exactly four dynamic custom sections
    customSections: [
      {
        kind: "info",

        id: "design-optimisation-overview",

        title: "Why Network Design and Optimisation Belong Together",

        description:
          "A network design predicts coverage, capacity, and interference using models, assumptions, and available data. Once the network becomes operational, actual traffic patterns, buildings, vegetation, user behaviour, and equipment performance can differ from those predictions. Network optimisation helps close that gap by using real-world measurements to identify where improvements are needed.\n\nTreating design and optimisation as one continuous cycle ensures that valuable engineering insights are not lost. Measurement results improve future planning assumptions, while knowledge of the original design helps engineers determine which optimisation actions are likely to deliver meaningful improvements. This creates a more informed approach to network performance, capacity management, and future investment.",

        bullets: [
          "Connect network planning with real-world performance data.",
          "Identify coverage, capacity, and interference challenges.",
          "Use measurement results to improve future design decisions.",
          "Prioritise engineering changes using measurable evidence.",
        ],
      },

      {
        kind: "info",

        id: "network-performance-outcomes",

        title: "Turning Network Data into Measurable Improvements",

        description:
          "Effective network optimisation starts with understanding how the existing network performs. Networsys uses available network counters, key performance indicators, customer-impact metrics, and field measurements to establish a baseline and identify areas that require attention. Drive testing and walk testing help reveal coverage gaps, interference, mobility issues, and differences between predicted and actual user experience.\n\nThe resulting analysis supports practical, prioritised recommendations. Depending on the findings, improvements may involve adjusting network parameters, refining antenna configurations, balancing traffic, adding capacity, or planning additional infrastructure. Changes can then be verified against agreed performance targets, helping organisations make better-informed decisions about network improvements and future investment.",

        bullets: [
          "Coverage, capacity, and service-quality assessments.",
          "Evidence-based recommendations for network improvements.",
          "Prioritised corrective actions and investment planning.",
          "Before-and-after measurement against agreed targets.",
        ],
      },

      {
        kind: "faq",

        id: "network-design-faq",

        title: "Frequently Asked Questions",

        description:
          "Answers to common questions about network planning, performance optimisation, measurement, and multi-vendor environments.",

        items: [
          {
            question:
              "What is the difference between network planning and network optimisation?",

            answer:
              "Network planning determines what to build and where, before or alongside deployment. Network optimisation improves an existing network using live measurements and performance data. Both disciplines work together: planning establishes the intended performance, while optimisation identifies where real-world conditions require adjustments.",
          },

          {
            question:
              "Can you optimise a network we did not design?",

            answer:
              "Yes. We begin with a baseline assessment regardless of who originally designed or built the network. Our assessment uses the available network data, performance measurements, and documentation to identify issues and develop practical recommendations.",
          },

          {
            question: "How do you measure network optimisation success?",

            answer:
              "We agree performance targets with you at the beginning of the engagement. Depending on the project, these may include coverage thresholds, throughput, accessibility, retainability, and mobility success. We then compare measured results against those targets to assess the impact of the recommended changes.",
          },

          {
            question: "Do you work with multi-vendor networks?",

            answer:
              "Yes. Network assessment and optimisation can involve equipment and data from different vendors. Our approach adapts to the available tools, documentation, and data formats to support analysis across multi-vendor environments.",
          },
        ],
      },

      {
        kind: "cards",

        id: "network-design-capabilities",

        title: "Our Network Design & Optimisation Services",

        description:
          "From initial planning to ongoing performance improvement, our services help organisations make informed engineering decisions throughout the network lifecycle.",

        cards: [
          {
            id: "requirements-planning",

            title: "Requirements Analysis & Planning",

            description:
              "Define coverage targets, user density, service requirements, growth forecasts, budgets, and timelines to establish a clear network planning strategy.",

            icon: ClipboardList,

            tags: [
              "Requirements",
              "Planning Strategy",
              "Growth Forecasting",
            ],
          },

          {
            id: "coverage-capacity",

            title: "Coverage & Capacity Planning",

            description:
              "Use propagation modelling and traffic forecasts to assess site requirements, sector coverage, spectrum layers, busy-hour demand, and future capacity needs.",

            icon: RadioTower,

            tags: [
              "Coverage Analysis",
              "Capacity Planning",
              "Traffic Forecasting",
            ],
          },

          {
            id: "network-design",

            title: "High-Level & Low-Level Design",

            description:
              "Translate network requirements into architecture, topology, and site-specific engineering details, including antenna selection, heights, azimuths, tilts, power settings, cabling, and equipment configuration.",

            icon: Network,

            tags: [
              "Network Architecture",
              "Site Design",
              "Engineering Documentation",
            ],
          },

          {
            id: "transmission-backhaul",

            title: "Transmission & Backhaul Design",

            description:
              "Design fibre and microwave backhaul and aggregation networks with attention to throughput, latency, resilience, and future upgrade requirements.",

            icon: Cable,

            tags: [
              "Fibre",
              "Microwave",
              "IP Transport",
            ],
          },

          {
            id: "performance-optimisation",

            title: "Performance & Radio Optimisation",

            description:
              "Analyse performance indicators and field measurements to identify coverage gaps, interference, mobility problems, congestion, and opportunities to improve radio parameters and antenna configurations.",

            icon: ChartNoAxesCombined,

            tags: [
              "Drive Testing",
              "KPI Analysis",
              "Radio Optimisation",
            ],
          },

          {
            id: "capacity-modernisation",

            title: "Capacity & Network Modernisation",

            description:
              "Assess congestion, topology, redundancy, and capacity headroom to prioritise improvements ranging from parameter adjustments to carrier additions, new sites, and small-cell deployments.",

            icon: Gauge,

            tags: [
              "Congestion Management",
              "Capacity Upgrades",
              "Network Resilience",
            ],
          },
        ],
      },
    ],

    // Five-step design and optimisation process
    optimisationProcess: [
      {
        id: "understand",

        step: "01",

        title: "Understand",

        description:
          "Gather network requirements, existing data, operational constraints, and business objectives. Agree on measurable success criteria before beginning the assessment.",

        icon: ClipboardList,
      },

      {
        id: "analyse",

        step: "02",

        title: "Analyse",

        description:
          "Review available measurements, model network behaviour, and assess coverage, capacity, interference, and performance to identify the underlying issues.",

        icon: Search,
      },

      {
        id: "recommend",

        step: "03",

        title: "Recommend",

        description:
          "Translate findings into prioritised recommendations, separating urgent performance fixes from medium-term improvements and longer-term infrastructure investments.",

        icon: Lightbulb,
      },

      {
        id: "implement-verify",

        step: "04",

        title: "Implement & Verify",

        description:
          "Apply agreed changes in controlled stages and measure the results against established performance targets to verify the impact of each improvement.",

        icon: SlidersHorizontal,
      },

      {
        id: "monitor-refine",

        step: "05",

        title: "Monitor & Refine",

        description:
          "Review changing traffic patterns and network conditions, using ongoing monitoring and periodic assessments to keep performance aligned with demand.",

        icon: Activity,
      },
    ],

    // Supported network technologies
    networkTypes: [
      {
        id: "mobile-networks",

        title: "Mobile Radio Networks",

        description:
          "Design and optimise mobile radio networks, from coverage planning and capacity assessment to performance tuning and ongoing improvements.",

        technologies: [
          "4G LTE",
          "5G NR",
          "Macro Cells",
          "Micro Cells",
          "Small Cells",
        ],
      },

      {
        id: "fibre-microwave-ip",

        title: "Fibre, Microwave & IP Transport",

        description:
          "Assess transmission and backhaul architecture to support throughput, latency, resilience, and future network expansion.",

        technologies: [
          "Fibre Transport",
          "Microwave Links",
          "IP Transport",
          "Backhaul",
        ],
      },

      {
        id: "enterprise-wireless",

        title: "Private & Enterprise Networks",

        description:
          "Plan and improve wireless networks for enterprise environments, including indoor coverage requirements and evolving user demand.",

        technologies: [
          "Private Wireless",
          "Enterprise Networks",
          "Indoor Coverage",
          "Small Cells",
        ],
      },
    ],

    // Technologies and engineering capabilities
    technologies: [
      "4G LTE & 5G NR",
      "Macro, Micro & Small Cells",
      "Indoor Wireless Networks",
      "Fibre & Microwave Transport",
      "IP Backhaul",
      "Coverage & Capacity Planning",
      "Drive & Walk Testing",
      "Radio Parameter Optimisation",
      "Network Performance Analysis",
      "Self-Organising Network Support",
    ],

    // Expected outcomes
    outcomes: [
      {
        title: "Network Performance Visibility",

        description:
          "Gain a clearer understanding of network coverage, capacity, and service quality using available measurements and performance data.",
      },

      {
        title: "Better Use of Existing Infrastructure",

        description:
          "Identify opportunities to improve the use of existing spectrum, sites, and equipment before committing to additional investment.",
      },

      {
        title: "Improved User Experience",

        description:
          "Address identified performance issues to support more consistent throughput, fewer dropped sessions, and improved network reliability.",
      },

      {
        title: "Evidence-Based Investment",

        description:
          "Prioritise engineering actions and infrastructure investments using measured performance, identified constraints, and agreed objectives.",
      },

      {
        title: "Future-Ready Network Design",

        description:
          "Develop network plans that account for changing demand, technology evolution, and future capacity requirements.",
      },
    ],

    // Business benefits
    benefits: [
      {
        title: "Design Informed by Real-World Data",

        description:
          "Connect planning assumptions with measured network behaviour to make future design decisions more accurate and practical.",
      },

      {
        title: "Prioritised Engineering Improvements",

        description:
          "Identify the issues with the greatest performance impact and organise corrective actions around agreed priorities.",
      },

      {
        title: "More Informed Investment Decisions",

        description:
          "Understand where existing infrastructure can be improved and where additional capacity or new sites may be required.",
      },

      {
        title: "Continuous Performance Improvement",

        description:
          "Use measurement, verification, and periodic reviews to keep network performance aligned with evolving requirements.",
      },
    ],

    // Final call to action
    cta: {
      title: "Better Networks Start with Better Data.",

      description:
        "Tell us about your network challenges and we will outline how network design and optimisation can address them through a structured, evidence-based approach.",

      buttonText: "Request a Network Assessment",

      href: "/contact",
    },

    // Related services
    related: [
      "network-deployment-rollout",
      "fibre-construction",
      "in-building-solutions-small-cells",
    ],
  },


  {
    slug: "rf-engineering",

    title: "RF Engineering",

    description:
      "RF engineering services covering radio planning, site surveys, propagation modelling, interference analysis, antenna design, and RF tuning to keep wireless networks reliable and efficient.",

    // SEO metadata
    metaTitle: "RF Engineering Services | Planning, Surveys & Tuning | Networsys",

    metaDescription:
      "Networsys RF engineering covers radio planning, site surveys, propagation modelling, interference analysis and RF tuning to keep wireless networks reliable and efficient.",

    keywords: [
      "RF engineering services",
      "RF planning",
      "RF site survey",
      "interference analysis",
      "RF optimisation",
      "propagation modelling",
    ],

    intro:
      "Radio frequency is the invisible foundation of every wireless service. Signal strength, interference, antenna choices, and spectrum use all shape whether a phone call connects, a video streams smoothly, or a connected machine stays online. Networsys provides RF engineering services that help wireless networks reach their coverage and quality targets in real environments, not only on paper. Our RF engineers combine planning tools, field measurement, and practical site experience to solve problems affecting operators, infrastructure companies, enterprises, and public venues.",

    tags: [
      "RF Planning",
      "Propagation Modelling",
      "Site Surveys",
      "Interference Analysis",
      "RF Optimisation",
    ],

    icon: RadioTower,

    stages: ["Design", "Build", "Optimise"],

    // Core RF engineering deliverables
    deliverables: [
      "RF planning and propagation modelling",
      "RF site surveys and feasibility assessments",
      "Antenna system design and configuration",
      "Frequency planning and spectrum utilisation",
      "Interference analysis and troubleshooting",
      "RF optimisation and parameter tuning",
      "Drive testing, walk testing, and validation",
      "Link budget calculations and microwave path planning",
      "Coverage gap identification and resolution",
      "RF performance reports and technical documentation",
    ],

    // Exactly four dynamic custom sections
    customSections: [
      {
        kind: "info",

        id: "rf-engineering-overview",

        title: "What RF Engineering Covers",

        description:
          "RF engineering is the discipline of planning, analysing, and tuning the radio part of a wireless system. It includes selecting sites and antennas, predicting coverage, setting frequencies and power levels, managing interference, and verifying that the built network behaves as designed. Every decision affects how reliably a network serves users across different locations and operating conditions.\n\nRF engineering also connects several stages of the network lifecycle. Planning results inform Network Design & Optimisation, accurate radio parameters support Network Deployment & Rollout, and indoor coverage projects require careful radio design through In-Building Solutions & Small Cells. Connecting these disciplines helps ensure that engineering decisions remain consistent from initial planning through implementation and validation.",

        bullets: [
          "Plan coverage using propagation modelling and site information.",
          "Assess antenna configurations, frequencies, and power levels.",
          "Identify interference and radio performance issues.",
          "Validate network performance through field measurements.",
        ],
      },

      {
        kind: "info",

        id: "rf-engineering-approach",

        title: "Measurement-Led RF Engineering",

        description:
          "Reliable RF engineering requires more than theoretical predictions. Terrain, buildings, obstructions, neighbouring transmitters, and actual site conditions can influence radio performance in ways that planning models alone cannot fully capture. Networsys combines planning tools, site surveys, spectrum analysis, and field measurements to develop a practical understanding of how the radio environment behaves.\n\nBy comparing measured results with design expectations, engineers can identify coverage gaps, interference, mobility problems, and opportunities to improve existing infrastructure. Recommendations may include antenna adjustments, parameter changes, frequency planning improvements, or additional capacity where required. Changes are evaluated against the intended objectives, and the resulting configuration and findings are documented for future engineering work.",

        bullets: [
          "Planning assumptions checked against real site conditions.",
          "Coverage and interference issues investigated using measurements.",
          "Engineering recommendations based on identified root causes.",
          "Performance validation and documented configuration changes.",
        ],
      },

      {
        kind: "faq",

        id: "rf-engineering-faq",

        title: "Frequently Asked Questions",

        description:
          "Learn more about RF engineering, site surveys, network optimisation, and wireless coverage challenges.",

        items: [
          {
            question: "What does an RF engineer actually do?",

            answer:
              "An RF engineer plans and tunes the radio side of a wireless network. Typical responsibilities include predicting coverage, selecting antenna configurations, analysing interference, validating performance in the field, and recommending improvements to coverage, quality, and capacity.",
          },

          {
            question:
              "Why is a site survey necessary if we already have a design?",

            answer:
              "Network designs rely on assumptions about site conditions. A site survey checks those assumptions against reality, including structural constraints, obstructions, access, potential antenna positions, cable routes, power availability, and interference. Identifying these issues early helps reduce redesign and unexpected installation work.",
          },

          {
            question:
              "Can RF engineering improve a network without adding new sites?",

            answer:
              "Often, yes. Antenna adjustments, radio parameter changes, and interference mitigation can improve an existing network without requiring additional sites. However, where the underlying issue is insufficient capacity or inadequate site coverage, additional infrastructure may still be necessary.",
          },

          {
            question: "Do you support 5G as well as 4G?",

            answer:
              "Yes. Our RF engineering scope supports planning and optimisation across 4G and 5G environments, including multi-layer and multi-band networks. The specific activities depend on the network architecture, available data, coverage objectives, and performance requirements.",
          },
        ],
      },

      {
        kind: "cards",

        id: "rf-engineering-services",

        title: "Our RF Engineering Services",

        description:
          "From initial radio planning to live-network troubleshooting, our RF engineering capabilities address the technical factors that influence wireless coverage, quality, and reliability.",

        cards: [
          {
            id: "rf-planning",

            title: "RF Planning & Propagation Modelling",

            description:
              "Use planning software, terrain and clutter data, and calibrated propagation models to predict coverage, assess signal quality, evaluate interference, and identify suitable site and antenna configurations.",

            icon: RadioTower,

            tags: [
              "RF Planning",
              "Coverage Prediction",
              "Propagation Modelling",
            ],
          },

          {
            id: "rf-site-surveys",

            title: "RF Site Surveys",

            description:
              "Assess structures, potential antenna positions, line of sight, obstructions, interference sources, access restrictions, cable routes, and power availability before deployment.",

            icon: MapPinned,

            tags: [
              "Site Assessment",
              "Feasibility",
              "Installation Readiness",
            ],
          },

          {
            id: "antenna-design",

            title: "Antenna System Design",

            description:
              "Evaluate antenna gain, beamwidth, frequency range, azimuth, mechanical and electrical tilt, height, separation, MIMO configurations, sector layouts, and structural constraints.",

            icon: Antenna,

            tags: [
              "Antenna Selection",
              "Sector Design",
              "Radio Coverage",
            ],
          },

          {
            id: "frequency-planning",

            title: "Frequency Planning & Spectrum",

            description:
              "Support frequency and carrier planning, channel allocation, coexistence analysis, and spectrum utilisation to address coverage and capacity requirements while managing interference risks.",

            icon: Radio,

            tags: [
              "Frequency Planning",
              "Spectrum",
              "Interference Control",
            ],
          },

          {
            id: "interference-troubleshooting",

            title: "Interference Analysis & Troubleshooting",

            description:
              "Investigate internal and external interference using spectrum analysis, uplink noise reviews, and targeted measurements to identify issues affecting throughput, signal quality, and session reliability.",

            icon: Radar,

            tags: [
              "Spectrum Analysis",
              "Root Cause Analysis",
              "RF Troubleshooting",
            ],
          },

          {
            id: "rf-optimisation",

            title: "RF Optimisation & Field Validation",

            description:
              "Compare measured performance with design expectations, evaluate antenna and radio parameter changes, and validate improvements through drive testing, walk testing, and field measurements.",

            icon: Activity,

            tags: [
              "RF Tuning",
              "Drive Testing",
              "Performance Validation",
            ],
          },
        ],
      },
    ],

    // Five-step RF engineering process
    rfEngineeringProcess: [
      {
        id: "define-objective",

        step: "01",

        title: "Define the Objective",

        description:
          "Establish the network requirement, coverage standard, throughput target, or specific performance issue. Agree on the criteria that will determine whether the engineering work is successful.",

        icon: Target,
      },

      {
        id: "gather-data",

        step: "02",

        title: "Gather Data",

        description:
          "Collect site information, existing configurations, planning data, network counters, and field measurements to establish the current radio environment and identify relevant constraints.",

        icon: Database,
      },

      {
        id: "analyse-decide",

        step: "03",

        title: "Model, Analyse & Decide",

        description:
          "Use planning tools and measurement analysis to evaluate potential solutions, comparing expected improvements with implementation cost, technical feasibility, and operational risk.",

        icon: Search,
      },

      {
        id: "implement",

        step: "04",

        title: "Implement Carefully",

        description:
          "Apply agreed parameter or hardware changes in controlled stages. Maintain clear configuration records so changes can be tracked and their effects assessed.",

        icon: SlidersHorizontal,
      },

      {
        id: "verify-document",

        step: "05",

        title: "Verify & Document",

        description:
          "Repeat relevant measurements, compare results with the original objectives, and document the final configuration and findings to support future maintenance and optimisation.",

        icon: FileCheck,
      },
    ],

    // Common RF challenges
    rfChallenges: [
      {
        id: "coverage-holes",

        title: "Coverage Holes",

        description:
          "Weak or missing signal can result from terrain, building obstructions, antenna positioning, or insufficient site density. We investigate the underlying cause and recommend suitable adjustments, antenna changes, or additional infrastructure.",

        icon: Signal,

        tags: [
          "Weak Signal",
          "Coverage Gaps",
          "Site Planning",
        ],
      },

      {
        id: "pilot-pollution",

        title: "Pilot Pollution & Overshooting",

        description:
          "Overlapping signals without a clear dominant cell can degrade radio quality and mobility. We assess coverage overlap and recommend appropriate antenna tilt, power, and configuration adjustments.",

        icon: RadioTower,

        tags: [
          "Cell Overlap",
          "Antenna Tilt",
          "Mobility",
        ],
      },

      {
        id: "indoor-coverage",

        title: "Poor Indoor Coverage",

        description:
          "Modern buildings and dense construction materials can weaken outdoor signals indoors. We assess the radio environment and recommend appropriate RF adjustments or dedicated indoor coverage solutions.",

        icon: Building2,

        tags: [
          "Indoor Signal",
          "Building Penetration",
          "Indoor Solutions",
        ],
      },

      {
        id: "dense-area-interference",

        title: "Interference in Dense Areas",

        description:
          "Dense radio environments require coordinated sector layouts, frequency strategies, and cell configurations. We investigate interference sources and identify practical changes to help maintain radio quality as demand grows.",

        icon: Radar,

        tags: [
          "Interference",
          "Frequency Strategy",
          "Urban Networks",
        ],
      },
    ],

    // Technologies supported
    technologies: [
      "4G LTE & 5G NR",
      "Macro, Micro & Small Cells",
      "Indoor Wireless Networks",
      "RF Propagation Modelling",
      "Antenna System Design",
      "Frequency & Spectrum Planning",
      "Spectrum Analysis",
      "Drive & Walk Testing",
      "RF Parameter Optimisation",
      "Microwave Link Planning",
    ],

    // Expected outcomes
    outcomes: [
      {
        title: "More Reliable Coverage",

        description:
          "Identify weak-signal areas and coverage inconsistencies, then develop recommendations based on site conditions and radio measurements.",
      },

      {
        title: "Better Radio Quality",

        description:
          "Investigate interference, overlapping signals, and configuration issues that can affect the quality and reliability of wireless services.",
      },

      {
        title: "Improved Network Efficiency",

        description:
          "Evaluate antenna configurations, spectrum usage, and radio parameters to identify opportunities to make better use of existing infrastructure.",
      },

      {
        title: "Evidence-Based Engineering",

        description:
          "Use propagation models, field measurements, and performance data to support practical engineering decisions and verify changes.",
      },
    ],

    // Why choose Networsys
    benefits: [
      {
        title: "Practical Engineering",

        description:
          "Account for actual site conditions, physical constraints, access requirements, and installation considerations when developing RF solutions.",
      },

      {
        title: "Measurement-Led Decisions",

        description:
          "Support engineering recommendations with available field measurements, planning data, and performance analysis.",
      },

      {
        title: "Cross-Discipline Collaboration",

        description:
          "Connect RF planning and optimisation with deployment, fibre, and in-building engineering activities.",
      },

      {
        title: "Clear Technical Reporting",

        description:
          "Present findings and recommendations in understandable language, with technical details available to engineering teams.",
      },
    ],

    // Final CTA
    cta: {
      title: "Solve Coverage and Interference Problems at the Source.",

      description:
        "Describe your site, coverage area, or network performance issue. Our RF engineering team will review your requirements and recommend a practical next step.",

      buttonText: "Speak to an RF Engineer",

      href: "/contact",
    },

    // Related services
    related: [
      "network-design-optimisation",
      "network-deployment-rollout",
      "in-building-solutions-small-cells",
    ],
  },

  {
    slug: "in-building-solutions-small-cells",

    title: "In-Building Solutions & Small Cells",

    description:
      "Networsys designs and delivers in-building wireless solutions and small cells, including DAS and indoor 4G/5G coverage for offices, hospitals, venues and campuses.",

    metaTitle:
      "In-Building Solutions & Small Cells | DAS & Indoor Coverage | Networsys",

    metaDescription:
      "Networsys designs and delivers in-building wireless solutions and small cells, including DAS and indoor 4G/5G coverage for offices, hospitals, venues and campuses.",

    primaryKeyword: "in-building solutions",

    secondaryKeywords: [
      "small cells",
      "distributed antenna system",
      "DAS",
      "indoor 5G coverage",
      "in-building wireless",
      "neutral host",
    ],

    url: "/services/in-building-solutions-small-cells",

    icon: Building2,

    tags: [
      "Indoor Wireless",
      "DAS",
      "Small Cells",
      "4G & 5G",
      "Neutral Host",
    ],

    intro: {
      heading: "Reliable Wireless Coverage, From Floor to Floor",
      description:
        "People spend much of their time indoors, where modern building materials can weaken mobile signals and create connectivity problems. Networsys designs, installs and commissions indoor wireless systems that improve coverage and capacity in the places where people work, travel, learn, heal and gather.",
    },

    stages: [
      {
        title: "Survey",
        description:
          "Assess building layouts, construction materials, existing signal conditions and expected user demand.",
        icon: Ruler,
      },
      {
        title: "Design",
        description:
          "Develop an indoor wireless architecture suited to the building, operator requirements and coverage objectives.",
        icon: Network,
      },
      {
        title: "Install",
        description:
          "Install antennas, cabling, equipment and supporting infrastructure with careful coordination around building operations.",
        icon: Wrench,
      },
      {
        title: "Commission",
        description:
          "Verify coverage and quality, test system performance and prepare the documentation required for handover.",
        icon: ClipboardCheck,
      },
    ],

    deliverables: [
      {
        title: "Indoor Coverage Assessment",
        description:
          "An assessment of existing signal conditions, coverage gaps, building layouts and wireless requirements.",
        icon: Signal,
      },
      {
        title: "DAS Design",
        description:
          "A distributed antenna system design covering antenna placement, cabling routes, power levels and signal sources.",
        icon: Network,
      },
      {
        title: "Small Cell Planning",
        description:
          "Targeted indoor wireless coverage and capacity solutions for specific areas and high-demand locations.",
        icon: RadioTower,
      },
      {
        title: "Infrastructure Installation",
        description:
          "Installation of antennas, cables, equipment racks, power connections and system labels.",
        icon: Cable,
      },
      {
        title: "Performance Testing",
        description:
          "Signal verification, interference checks, handover testing and acceptance measurements.",
        icon: Activity,
      },
      {
        title: "Handover Documentation",
        description:
          "As-built information, test records and operating documentation to support ongoing management.",
        icon: ClipboardCheck,
      },
    ],

    /*
     * Exactly four custom sections:
     * 1. Information section
     * 2. Information section
     * 3. Expandable FAQ section
     * 4. Six-card section
     */
    customSections: [
      // SECTION 1: INFORMATION
      {
        kind: "info",
        id: "indoor-coverage-challenges",
        title: "Why Indoor Coverage Needs Its Own Solution",
        description:
          "Outdoor mobile networks are designed to cover wide areas, not every floor, stairwell or basement. Reinforced concrete, energy-efficient glazing, metal cladding and other building materials can weaken signals before they reach the people and devices inside.",
        bullets: [
          "Identify weak-signal areas and indoor coverage gaps.",
          "Address capacity limitations in busy buildings.",
          "Improve connectivity for staff, visitors and customers.",
          "Plan wireless infrastructure around building layouts and usage.",
          "Support connected devices and building management systems.",
        ],
      },

      // SECTION 2: INFORMATION
      {
        kind: "info",
        id: "indoor-wireless-engineering",
        title: "Engineered for Coverage, Capacity and Future Growth",
        description:
          "Every building has different construction constraints, occupancy patterns and connectivity requirements. We assess these conditions before selecting an appropriate solution, balancing reliable signal coverage, available capacity, installation requirements and long-term flexibility.",
        bullets: [
          "Design for coverage, signal quality and expected user demand.",
          "Plan multi-band and 5G-ready infrastructure where required.",
          "Coordinate indoor systems with the surrounding outdoor network.",
          "Account for interference and passive intermodulation risks.",
          "Plan fibre backhaul, power, fire-stopping and access requirements.",
          "Coordinate installation with building managers and other stakeholders.",
        ],
      },

      // SECTION 3: FAQ
      {
        kind: "faq",
        id: "in-building-wireless-faq",
        title: "Frequently Asked Questions",
        description:
          "Understand the available technologies, installation requirements and options for improving indoor wireless connectivity.",

        items: [
          {
            question: "What is the difference between DAS and small cells?",
            answer:
              "A Distributed Antenna System (DAS) distributes a signal through multiple antennas connected to a central source. It can suit large buildings and multi-operator environments. Small cells are individual, low-power radio nodes that provide targeted coverage or additional capacity. The right option depends on building size, user demand and operator requirements.",
          },
          {
            question: "Does our building need an in-building solution?",
            answer:
              "If people regularly experience weak mobile signals, dropped calls or slow data indoors, a coverage assessment can help determine whether a dedicated indoor wireless system is justified.",
          },
          {
            question: "Can one system serve several mobile operators?",
            answer:
              "Yes. Neutral-host and multi-operator DAS designs can allow multiple mobile networks to share the same indoor infrastructure, subject to agreements and technical requirements from the relevant operators.",
          },
          {
            question: "How disruptive is installation?",
            answer:
              "Installation can be planned around building operations. Depending on the site, work may be scheduled outside normal operating hours or delivered in phases to reduce disruption to occupants and business activities.",
          },
          {
            question: "Will the system support 5G?",
            answer:
              "Indoor systems can be designed to support 5G and relevant future frequency bands. The exact architecture depends on operator requirements, available infrastructure and the selected equipment.",
          },
          {
            question: "Are repeaters suitable for every building?",
            answer:
              "No. Repeaters may be suitable for some smaller premises with limited coverage problems, but their suitability must be assessed. Equipment selection and installation must comply with applicable regulations and operator requirements because poorly installed repeaters can interfere with the wider network.",
          },
        ],
      },

      // SECTION 4: SIX CARDS
      {
        kind: "cards",
        id: "indoor-wireless-applications",
        title: "Where In-Building Solutions Make a Difference",
        description:
          "Different environments create different wireless challenges. Our approach considers building structure, occupancy, operational requirements and the connectivity experience expected in each location.",

        cards: [
          {
            title: "Offices & Corporate Campuses",
            description:
              "Support mobile working, voice calls, collaboration tools and reliable connectivity throughout modern workplaces.",
            icon: BriefcaseBusiness,
          },
          {
            title: "Hospitals & Healthcare",
            description:
              "Plan indoor wireless coverage for clinical teams, visitors and connected devices while accounting for sensitive environments and phased working.",
            icon: Hospital,
          },
          {
            title: "Stadiums & Event Venues",
            description:
              "Address high user density with coverage and capacity planning designed around peak attendance and busy event periods.",
            icon: Users,
          },
          {
            title: "Transport Hubs & Underground Spaces",
            description:
              "Plan wireless coverage for stations, airports, tunnels and other challenging environments with demanding access and safety requirements.",
            icon: TrainFront,
          },
          {
            title: "Retail & Hospitality",
            description:
              "Support payments, guest connectivity, navigation and operational systems while considering interior design and antenna placement.",
            icon: ShoppingBag,
          },
          {
            title: "Industrial & Logistics Sites",
            description:
              "Support wireless connectivity for warehouses, factories, ports, handheld devices, sensors and suitable private wireless deployments.",
            icon: Warehouse,
          },
        ],
      },
    ],

    // DELIVERY PROCESS
    inBuildingProcess: [
      {
        step: "01",
        title: "Survey & Requirements",
        description:
          "We assess the site, measure existing signal conditions and agree on coverage and capacity objectives with the relevant stakeholders.",
        icon: Ruler,
      },
      {
        step: "02",
        title: "Design & Approval",
        description:
          "We prepare the indoor wireless design and coverage predictions, then share them with building owners, operators and other stakeholders for review.",
        icon: Target,
      },
      {
        step: "03",
        title: "Install & Integrate",
        description:
          "Our teams coordinate installation around building operations and follow documented working methods and safety procedures.",
        icon: Wrench,
      },
      {
        step: "04",
        title: "Test & Handover",
        description:
          "We verify performance across floors, resolve identified issues and provide as-built documentation, test records and operating information.",
        icon: CheckCircle2,
      },
    ],

    // TECHNICAL CONSIDERATIONS
    technicalConsiderations: [
      {
        title: "Coverage, Capacity & Signal Quality",
        description:
          "Signal strength alone does not determine the user experience. We consider signal quality, interference and available capacity during busy periods.",
        icon: Activity,
      },
      {
        title: "Multi-Band & 5G Readiness",
        description:
          "We consider future frequency bands and technology upgrades when planning indoor cabling and antenna infrastructure.",
        icon: RadioTower,
      },
      {
        title: "Interference & Outdoor Network Integration",
        description:
          "Indoor coverage must coexist with the outdoor macro network. RF planning helps manage handover boundaries and potential interference around entrances and windows.",
        icon: Radio,
      },
      {
        title: "Passive Intermodulation Control",
        description:
          "Component quality and installation practices matter in multi-operator DAS environments. Appropriate components and connection testing help protect uplink performance.",
        icon: ShieldCheck,
      },
      {
        title: "Backhaul & Power",
        description:
          "Indoor radio equipment needs reliable connectivity and power. Fibre routes and supporting transmission infrastructure are considered as part of the design.",
        icon: Zap,
      },
      {
        title: "Safety & Building Requirements",
        description:
          "Cabling and equipment installation must account for building regulations, fire-stopping, access restrictions and tenant working hours.",
        icon: Building2,
      },
    ],

    // KEY BENEFITS
    benefits: [
      {
        title: "Radio-Led Design",
        description:
          "Solutions are based on measured site conditions, building characteristics and actual connectivity requirements.",
        icon: RadioTower,
      },
      {
        title: "Reduced Installation Disruption",
        description:
          "Careful scheduling, phased delivery where required and coordination with site teams help minimise disruption.",
        icon: Users,
      },
      {
        title: "Future-Ready Infrastructure",
        description:
          "Cabling and antenna layouts can be planned with suitable upgrade paths in mind.",
        icon: Network,
      },
      {
        title: "Joined-Up Delivery",
        description:
          "Design, installation, commissioning and documentation are coordinated as part of a connected delivery process.",
        icon: CheckCircle2,
      },
    ],

    // CTA
    cta: {
      headline: "Strong Signal in Every Corridor, Floor and Room",
      description:
        "Share your building details with the Networsys team. We will help assess your indoor coverage requirements and recommend a suitable wireless approach.",
      buttonText: "Request an Indoor Coverage Survey",
      buttonLink: "/contact",
    },

    // RELATED SERVICES
    related: [
      "rf-engineering",
      "network-design-optimisation",
      "network-deployment-rollout",
      "fibre-engineering-survey",
    ],

    technologies: [
      "Distributed Antenna Systems (DAS)",
      "Small Cells",
      "Neutral Host Solutions",
      "4G & 5G Indoor Coverage",
      "Repeaters",
      "Fibre & Coax Cabling",
      "Active DAS",
      "Passive DAS",
      "MIMO Antenna Systems",
      "Multi-Operator Solutions",
    ],
  },

  {
    slug: "fibre-construction",

    title: "Fibre Construction Services",

    description:
      "Networsys delivers fibre construction for backbone, metro and access networks, including trenching, ducting, cable installation, splicing, testing and reinstatement.",

    metaTitle:
      "Fibre Construction Services | Ducting, Cabling & Installation | Networsys",

    metaDescription:
      "Networsys delivers fibre construction for backbone, metro and access networks, including trenching, ducting, cable installation, splicing, testing and reinstatement.",

    primaryKeyword: "fibre construction services",

    secondaryKeywords: [
      "fibre optic installation",
      "fibre network build",
      "ducting and trenching",
      "fibre splicing",
      "FTTH construction",
    ],

    url: "/services/fibre-construction",

    icon: Cable,

    tags: [
      "Fibre Construction",
      "Civil Works",
      "Fibre Installation",
      "Splicing & Testing",
      "FTTx Networks",
    ],

    intro: {
      heading: "Building Reliable Fibre Infrastructure",
      description:
        "Fibre optic cable carries the data behind mobile networks, broadband, businesses, data centres and public services. Its capacity, performance and service life depend on the quality of the physical installation. Networsys transforms approved route designs into dependable, tested and well-documented fibre infrastructure.",
    },

    // =========================================================
    // DELIVERY STAGES
    // =========================================================

    stages: [
      {
        title: "Plan",
        description:
          "Review route designs, utility records, permits, access conditions and construction requirements before work begins.",
        icon: ClipboardCheck,
      },
      {
        title: "Construct",
        description:
          "Build the physical route using suitable civil works, ducting, trenchless methods or aerial installation.",
        icon: Construction,
      },
      {
        title: "Install & Connect",
        description:
          "Place fibre cables, complete splicing and termination, and organise connections according to the approved design.",
        icon: Cable,
      },
      {
        title: "Test & Handover",
        description:
          "Verify fibre performance and provide test results, as-built drawings and asset documentation.",
        icon: CheckCircle2,
      },
    ],

    // =========================================================
    // KEY DELIVERABLES
    // =========================================================

    deliverables: [
      {
        title: "Trenching & Civil Works",
        description:
          "Excavation, backfilling and associated civil works for new fibre routes, with attention to existing utilities and reinstatement requirements.",
        icon: Construction,
      },
      {
        title: "Ducting & Subduct Installation",
        description:
          "Installation of ducts, subducts and chambers to create protected pathways for current and future fibre cables.",
        icon: Layers,
      },
      {
        title: "Trenchless Installation",
        description:
          "Directional drilling and other suitable trenchless methods for routes crossing roads, railways and sensitive surfaces.",
        icon: Drill,
      },
      {
        title: "Fibre Cable Installation",
        description:
          "Controlled cable blowing, pulling and placement based on cable specifications, duct conditions and route geometry.",
        icon: Cable,
      },
      {
        title: "Splicing & Termination",
        description:
          "Fibre splicing, enclosure organisation, labelling and termination according to the approved network design.",
        icon: Workflow,
      },
      {
        title: "Testing & Certification",
        description:
          "Optical loss measurements and appropriate OTDR testing, with results recorded for project acceptance and handover.",
        icon: Activity,
      },
    ],

    // =========================================================
    // CUSTOM SECTIONS — EXACTLY FOUR
    // 1. Information
    // 2. Information
    // 3. FAQ
    // 4. Six-card grid
    // =========================================================

    customSections: [
      // -------------------------------------------------------
      // SECTION 1: INFORMATION
      // -------------------------------------------------------

      {
        kind: "info",
        id: "fibre-construction-overview",

        title: "What Fibre Construction Includes",

        description:
          "Fibre construction is the physical creation of a fibre route. It covers preparing the route, installing ducts and chambers, placing cables, connecting fibres, testing the completed links and restoring affected surfaces. Depending on the project, work may use underground, aerial or in-building installation methods.",

        bullets: [
          "Excavation, trenching and associated civil works.",
          "Ducting, subduct installation and chamber construction.",
          "Directional drilling and other suitable trenchless methods.",
          "Aerial cable installation and in-building fibre cabling.",
          "Cable placement, fibre splicing and termination.",
          "Optical testing, documentation and surface reinstatement.",
        ],
      },

      // -------------------------------------------------------
      // SECTION 2: INFORMATION
      // -------------------------------------------------------

      {
        kind: "info",
        id: "fibre-construction-quality",

        title: "Built for Performance, Protection and Long-Term Reliability",

        description:
          "A fibre network is only as dependable as the infrastructure supporting it. Cable handling, duct condition, installation tension, splice quality and route protection all affect the finished build. Our construction approach incorporates quality checks throughout delivery rather than waiting until the project is complete.",

        bullets: [
          "Review utility records, permits and route access before excavation.",
          "Select installation methods according to site conditions.",
          "Protect cables through suitable handling and installation practices.",
          "Check duct integrity, cable placement and enclosure sealing.",
          "Test completed links and record the results.",
          "Provide as-built drawings, photographs and asset records.",
        ],
      },

      // -------------------------------------------------------
      // SECTION 3: FAQ
      // -------------------------------------------------------

      {
        kind: "faq",
        id: "fibre-construction-faq",

        title: "Frequently Asked Questions",

        description:
          "Find answers to common questions about fibre construction methods, testing, project schedules and existing infrastructure.",

        items: [
          {
            question:
              "What is the difference between fibre construction and fibre engineering?",

            answer:
              "Fibre engineering focuses on surveys, route planning, design and assessment. Fibre construction delivers the physical network through excavation, ducting, cable placement, splicing, testing and reinstatement. The two activities work closely together, and early coordination can help identify practical construction constraints.",
          },
          {
            question: "How long does a fibre construction project take?",

            answer:
              "The schedule depends on route length, ground conditions, permits, access requirements and the installation method. A short route may take days, while a larger network may be delivered in phases over several months. A project schedule can be prepared once the route and constraints are understood.",
          },
          {
            question: "Do you test the fibre after installation?",

            answer:
              "Yes. Fibre links are tested before handover. Testing typically includes end-to-end optical loss measurements and, where appropriate, Optical Time-Domain Reflectometer (OTDR) traces. The results are recorded in the handover documentation.",
          },
          {
            question: "Can existing ducts be reused?",

            answer:
              "Existing ducts may be reused when they are suitable for the planned installation. Their condition and capacity should be assessed before work begins, because blocked, damaged or undersized ducts can create installation problems.",
          },
          {
            question:
              "Which fibre installation methods can be used?",

            answer:
              "Depending on the route and site conditions, installation may use conventional trenching, micro-trenching, horizontal directional drilling, other suitable trenchless methods or aerial installation. The appropriate method depends on ground conditions, permits, existing infrastructure and project requirements.",
          },
          {
            question:
              "What documentation is supplied at handover?",

            answer:
              "Handover documentation can include as-built drawings, fibre test results, OTDR traces where applicable, installation photographs and asset records in the agreed format. These records help the operations team understand and maintain the completed network.",
          },
        ],
      },

      // -------------------------------------------------------
      // SECTION 4: SIX-CARD GRID
      // -------------------------------------------------------

      {
        kind: "cards",
        id: "fibre-construction-services",

        title: "Our Fibre Construction Services",

        description:
          "From preparing the route to testing the completed network, we coordinate the physical construction activities needed to deliver reliable fibre infrastructure.",

        cards: [
          {
            title: "Trenching & Civil Works",

            description:
              "Create new fibre routes through planned excavation, bedding, backfilling and surface reinstatement, with attention to utilities and site requirements.",

            icon: Construction,
          },
          {
            title: "Ducting & Subducts",

            description:
              "Install ducts, subducts and chambers that protect fibre cables and provide suitable pathways for future network expansion.",

            icon: Layers,
          },
          {
            title: "Directional Drilling",

            description:
              "Use suitable trenchless methods to install fibre pathways beneath roads, railways and other obstacles while limiting surface disruption.",

            icon: Drill,
          },
          {
            title: "Cable Placement",

            description:
              "Install fibre using appropriate blowing or pulling methods, controlling tension and bend radius to protect cable performance.",

            icon: Cable,
          },
          {
            title: "Fibre Splicing & Termination",

            description:
              "Join, organise, label and terminate fibres within enclosures, joint closures and patch panels according to the design.",

            icon: Workflow,
          },
          {
            title: "Testing & Reinstatement",

            description:
              "Verify optical performance, record test results and restore affected footways, carriageways, verges and other surfaces.",

            icon: ClipboardCheck,
          },
        ],
      },
    ],

    // =========================================================
    // FIBRE NETWORK TYPES — FIVE CARDS
    // =========================================================

    networkTypes: [
      {
        title: "Backbone & Long-Haul Routes",

        description:
          "Build high-capacity fibre routes connecting cities, data centres and major network nodes, with attention to resilience, joint spacing, testing and maintainability.",

        icon: Network,

        tags: ["Backbone", "Long-Haul", "High Capacity"],
      },
      {
        title: "Metro & Aggregation Networks",

        description:
          "Construct metro rings and aggregation routes linking mobile sites, exchanges and enterprise buildings, coordinating work with relevant authorities.",

        icon: Route,

        tags: ["Metro", "Aggregation", "Network Rings"],
      },
      {
        title: "Fibre to the Home & Business",

        description:
          "Build FTTx access networks using distribution cabling, splitter locations, chambers and drop connections to bring fibre closer to or directly into premises.",

        icon: Home,

        tags: ["FTTH", "FTTB", "FTTx"],
      },
      {
        title: "Mobile Backhaul & Fronthaul",

        description:
          "Install fibre links connecting mobile sites and radio equipment to the wider network, supporting 4G, 5G and future capacity requirements.",

        icon: RadioTower,

        tags: ["4G", "5G", "Mobile Networks"],
      },
      {
        title: "Enterprise & Data Centre Connectivity",

        description:
          "Install private fibre connections between buildings, campuses, equipment rooms and data centres to support scalable organisational connectivity.",

        icon: Server,

        tags: ["Enterprise", "Campus", "Data Centres"],
      },
    ],

    // =========================================================
    // PROJECT DELIVERY PROCESS — FOUR STEPS
    // =========================================================

    fibreConstructionProcess: [
      {
        step: "01",

        title: "Planning & Pre-Construction",

        description:
          "Review route designs, permits, utility records and access conditions. Prepare appropriate method statements and traffic management plans before construction begins.",

        icon: ClipboardCheck,
      },
      {
        step: "02",

        title: "Construction Management",

        description:
          "Organise work into manageable sections with defined crews, equipment and quality checks. Maintain progress records that capture completed work, issues and measurements.",

        icon: Construction,
      },
      {
        step: "03",

        title: "Quality Control",

        description:
          "Check duct integrity, installation depth, cable handling, splice quality and enclosure sealing at defined stages. Record corrective actions and verify their completion.",

        icon: ShieldCheck,
      },
      {
        step: "04",

        title: "Testing & Handover",

        description:
          "Test completed links and supply as-built drawings, optical test results, photographs and asset records in the agreed format.",

        icon: FileCheck,
      },
    ],

    // =========================================================
    // TECHNICAL CONSIDERATIONS
    // =========================================================

    technicalConsiderations: [
      {
        title: "Route Planning & Existing Utilities",

        description:
          "Review route information, utility records, permits and site access conditions to help reduce avoidable delays and the risk of damaging existing services.",

        icon: Route,
      },
      {
        title: "Duct Capacity & Integrity",

        description:
          "Assess duct condition, capacity and pathway suitability before installation. Appropriate ducts can support current cable placement and future network additions.",

        icon: Layers,
      },
      {
        title: "Cable Handling & Placement",

        description:
          "Control installation tension and bend radius according to cable requirements to reduce the risk of damage during pulling or blowing.",

        icon: Cable,
      },
      {
        title: "Splicing & Optical Performance",

        description:
          "Complete fibre connections carefully and use optical loss measurements and appropriate OTDR testing to assess the finished links.",

        icon: Activity,
      },
      {
        title: "Safety & Traffic Management",

        description:
          "Coordinate excavation controls, work zones, traffic management, protective equipment and safe working near existing services.",

        icon: HardHat,
      },
      {
        title: "Environmental Care & Reinstatement",

        description:
          "Manage waste, protect trees and watercourses where relevant, control noise and restore affected surfaces to the required standard.",

        icon: Trees,
      },
    ],

    // =========================================================
    // KEY BENEFITS
    // =========================================================

    benefits: [
      {
        title: "Build Quality That Lasts",

        description:
          "Careful installation practices help protect fibre performance and the long-term reliability of the physical network.",

        icon: ShieldCheck,
      },
      {
        title: "Flexible Construction Methods",

        description:
          "Select suitable trenching, trenchless, micro-trenching or aerial methods according to route conditions and project requirements.",

        icon: Settings2,
      },
      {
        title: "Evidence-Based Handover",

        description:
          "Provide test records and as-built documentation to give operations teams a clear record of the infrastructure delivered.",

        icon: FileCheck,
      },
      {
        title: "Integrated Project Support",

        description:
          "Coordinate construction with fibre engineering, survey and network deployment activities for a more connected delivery process.",

        icon: Network,
      },
    ],

    // =========================================================
    // SAFETY, ENVIRONMENT & COMMUNITY
    // =========================================================

    safetyEnvironment: {
      title: "Safety, Environment & Community",

      description:
        "Fibre construction often takes place around roads, homes, businesses and sensitive land. Planning and communication help protect workers, the public and the surrounding environment while keeping disruption manageable.",

      points: [
        {
          title: "Worker & Public Safety",

          description:
            "Use suitable traffic management, excavation controls, safe working procedures and protective equipment.",
        },
        {
          title: "Environmental Protection",

          description:
            "Consider waste management, trees, watercourses, noise and the condition of the surrounding site.",
        },
        {
          title: "Community Coordination",

          description:
            "Communicate with residents, businesses, landowners and other stakeholders about planned work and potential disruption.",
        },
        {
          title: "Site Restoration",

          description:
            "Reinstate affected footways, carriageways, verges and private land to the required standard and retain relevant records.",
        },
      ],
    },

    // =========================================================
    // CTA
    // =========================================================

    cta: {
      headline: "Build Fibre Infrastructure You Can Depend On",

      description:
        "Send us your route or project outline and the Networsys team will help identify a suitable fibre construction approach.",

      buttonText: "Discuss Your Fibre Project",

      buttonLink: "/contact",
    },

    // =========================================================
    // RELATED SERVICES
    // =========================================================

    related: [
      "fibre-engineering-survey",
      "network-deployment-rollout",
      "network-design-optimisation",
      "in-building-solutions-small-cells",
    ],

    technologies: [
      "Underground Fibre Construction",
      "Aerial Fibre Installation",
      "Directional Drilling & Boring",
      "Trenching & Civil Works",
      "Duct & Subduct Installation",
      "Fibre Splicing & Termination",
      "OTDR Testing & Certification",
      "Site Reinstatement",
      "Single-Mode & Multi-Mode Fibre",
      "Backbone & Metro Networks",
    ],
  },


  {
    slug: 'fibre-engineering-survey',
    title: 'Fibre Engineering & Survey',
    description: 'Route survey, make-ready, GIS.',
    intro: 'Engineering and planning before and during fibre deployment — route surveys, make-ready engineering, pole loading analysis, permit drawings, GIS mapping, jurisdictional coordination and as-built documentation.',
    tags: ['GIS', 'Survey'],
    icon: Map,
    stages: ['Survey', 'Design'],
    deliverables: ['Route surveys', 'Make-ready engineering', 'Pole loading analysis', 'Permit drawings', 'GIS mapping', 'Jurisdictional coordination', 'As-built documentation'],
    technologies: ['GIS mapping', 'Make-ready', 'As-built documentation'],
    related: ['fibre-construction', 'network-deployment-rollout'],
  },
];

export const serviceBySlug = (slug: string) => services.find(service => service.slug === slug);
