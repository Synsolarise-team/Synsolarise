export type SectorId = 'residential' | 'commercial' | 'industrial';

export type ServiceCategoryGroup =
  | 'All'
  | 'Sectors (Residential · Commercial · Industrial)'
  | 'Grid, Zero Export & Hybrid'
  | 'HV Storage, Bypass & Commissioning';

export interface SolarService {
  id: string;
  code: string;
  title: string;
  group: Exclude<ServiceCategoryGroup, 'All'>;
  summary: string;
  deliverables: string[];
}

export type AccessoryCategory =
  | 'All'
  | 'Circuit & Surge Protection'
  | 'Distribution & Metering'
  | 'Cabling, Earthing & Mounting'
  | 'Storage & Safety';

export interface AccessoryItem {
  id: string;
  name: string;
  category: Exclude<AccessoryCategory, 'All'>;
  ratingSpec: string;
  standard: string;
  summary: string;
  integrationRole: string;
  keySpecs: { label: string; value: string }[];
}

export interface BrandItem {
  name: string;
  domain: 'Inverters & Power Electronics' | 'Lithium Energy Storage' | 'Photovoltaic Modules';
  technologyNote: string;
}

export type GalleryCategory =
  | 'All'
  | 'Residential Projects'
  | 'Commercial Projects'
  | 'Industrial Projects'
  | 'On-Grid Installations'
  | 'Hybrid Installations'
  | 'High Voltage Battery Projects'
  | 'Inverter Installations'
  | 'Solar Accessories & Electrical Work';

export interface ProjectMediaItem {
  label: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
}

export interface ProjectCase {
  id: string;
  sector: SectorId;
  primaryCategory: Exclude<GalleryCategory, 'All'>;
  categories: Exclude<GalleryCategory, 'All'>[];
  provenance: 'Actual Synsolarise Site' | 'Illustrative Reference Sample';
  title: string;
  location: string;
  systemSizeKw: string;
  annualProductionKwh: string;
  commissioningHighlight: string;
  clientNeeds: string;
  solutionProvided: string;
  equipmentDeployed: string[];
  media: ProjectMediaItem[];
}

export const COMPANY_INFO = {
  name: 'SYNSOLARISE',
  tagline: 'From Solar Planning to Power Generation – We Handle Everything!',
  owner: 'Ayub Masih',
  designation: 'Owner & Solar Consultant',
  phoneDisplay: '03453273342',
  phoneHref: 'tel:+923453273342',
  whatsappHref: 'https://wa.me/923453273342',
  phoneDisplay2: '038082347023',
  phoneHref2: 'tel:+9238082347023',
  whatsappHref2: 'https://wa.me/9238082347023',
  email: 'synsolarise@gmail.com',
  emailHref: 'mailto:synsolarise@gmail.com',
} as const;

export const GENERATED_IMAGES = {
  hero: '/src/assets/images/hero_solar_installation_1795465999636.jpg',
  distributionPanel: '/src/assets/images/protection_distribution_panel_1795466001824.jpg',
  commissioning: '/src/assets/images/industrial_solar_commissioning_1795466000859.jpg',
  mountingCabling: '/src/assets/images/solar_mounting_cabling_1795466001240.jpg',
} as const;

export const UPLOADED_MEDIA = {
  promoVideo: '/assets/aistudio/Synsolarise_30sec_Promo-1_029e3d87.mp4',
  stepByStepPoster: '/assets/aistudio/file_0000000039c88208853170a95eda2baa_1bbfbadf.png',
  siteCompletedPoster: '/assets/aistudio/file_00000000401c82119b46b5f150f9d149_f08a2cb2.png',
  onsiteInverterTeam: '/assets/aistudio/IMG20261120142457_b34e2fc9.jpg',
} as const;

export const HERO_CAPABILITIES = [
  {
    value: 'Residential to Industrial',
    label: 'Home rooftops, plazas & large industrial plants',
  },
  {
    value: '9 Core Service Lines',
    label: 'On-grid, hybrid, zero export & HV battery systems',
  },
  {
    value: '17 Protection Items',
    label: 'Complete AC/DC breakers, SPD, CT & earthing gear',
  },
  {
    value: 'End-to-End Commissioning',
    label: 'Programming, parameter setup & final load testing',
  },
];

export const SERVICE_CATEGORY_GROUPS: ServiceCategoryGroup[] = [
  'All',
  'Sectors (Residential · Commercial · Industrial)',
  'Grid, Zero Export & Hybrid',
  'HV Storage, Bypass & Commissioning',
];

export const SOLAR_SERVICES: SolarService[] = [
  {
    id: 'residential-solar',
    code: 'A.',
    title: 'Residential Solar Solutions',
    group: 'Sectors (Residential · Commercial · Industrial)',
    summary:
      'Complete rooftop solar installations tailored to household consumption, backup reliability, and future load expansion.',
    deliverables: [
      'Home solar installations',
      'On-grid solar systems',
      'Hybrid solar systems',
      'Off-grid solar systems',
      'Battery backup solutions',
      'Solar system upgrades',
    ],
  },
  {
    id: 'commercial-solar',
    code: 'B.',
    title: 'Commercial Solar Solutions',
    group: 'Sectors (Residential · Commercial · Industrial)',
    summary:
      'Reliable daytime generation and storage architectures designed to cut operating utility expenses for commercial properties.',
    deliverables: [
      'Shops and offices',
      'Commercial buildings',
      'Shopping plazas',
      'Commercial hybrid systems',
      'Commercial energy storage',
    ],
  },
  {
    id: 'industrial-solar',
    code: 'C.',
    title: 'Industrial Solar Solutions',
    group: 'Sectors (Residential · Commercial · Industrial)',
    summary:
      'High-capacity industrial photovoltaic and storage plants engineered with complete electrical integration and safety compliance.',
    deliverables: [
      'Industrial solar installations',
      'Large-scale hybrid systems',
      'High-capacity inverter installations',
      'Industrial battery storage',
      'Complete electrical integration',
      'Industrial solar commissioning',
    ],
  },
  {
    id: 'on-grid-solar',
    code: 'D.',
    title: 'On-Grid Solar Systems',
    group: 'Grid, Zero Export & Hybrid',
    summary:
      'Utility-synchronized solar generation systems built for clean grid export, net metering readiness, and maximum energy yield.',
    deliverables: [
      'On-grid inverter installation',
      'Grid synchronization',
      'Net metering support',
      'Smart meter integration',
      'System configuration and testing',
    ],
  },
  {
    id: 'zero-export-solutions',
    code: 'E.',
    title: 'Zero Export Solutions',
    group: 'Grid, Zero Export & Hybrid',
    summary:
      'Precision export-limiting control loops that match solar output dynamically to site load without feeding power back to the grid.',
    deliverables: [
      'Zero export device installation',
      'Smart meter configuration',
      'CT sensor installation',
      'Export limitation configuration',
      'Zero export testing and commissioning',
    ],
  },
  {
    id: 'hybrid-solar-systems',
    code: 'F.',
    title: 'Hybrid Solar Systems',
    group: 'Grid, Zero Export & Hybrid',
    summary:
      'Integrated solar, utility grid, and battery backup systems engineered for uninterrupted power across load-shedding windows.',
    deliverables: [
      'Hybrid inverter installation',
      'Solar and battery integration',
      'Backup power configuration',
      'Single and multiple battery storage systems',
      'Complete hybrid system commissioning',
    ],
  },
  {
    id: 'high-voltage-battery',
    code: 'G.',
    title: 'High Voltage Battery Solutions',
    group: 'HV Storage, Bypass & Commissioning',
    summary:
      'Modular high-voltage lithium battery banks paired with BTU controllers and closed-loop BMS communication for commercial and industrial backup.',
    deliverables: [
      'High voltage inverter installation',
      'High voltage lithium battery installation',
      'Battery parallel configurations',
      'Single and multiple battery storage systems',
      'Battery control unit (BTU) integration',
      'BMS and battery communication integration',
      'Complete HV battery commissioning',
    ],
  },
  {
    id: 'changeover-bypass',
    code: 'H.',
    title: 'Automatic Changeover & Bypass Systems',
    group: 'HV Storage, Bypass & Commissioning',
    summary:
      'Dependable source-switching and inverter-bypass assemblies ensuring zero downtime during maintenance or grid transitions.',
    deliverables: [
      'Automatic changeover installation',
      'Manual changeover systems',
      'Automatic bypass systems',
      'Electrical source switching',
      'Backup power management',
    ],
  },
  {
    id: 'inverter-commissioning',
    code: 'I.',
    title: 'Solar Inverter Installation & Commissioning',
    group: 'HV Storage, Bypass & Commissioning',
    summary:
      'Technical mounting, firmware parameter tuning, fault diagnostics, and load performance verification for any solar inverter platform.',
    deliverables: [
      'Inverter installation',
      'Inverter programming',
      'Parameter configuration',
      'System commissioning',
      'Troubleshooting',
      'Performance testing',
    ],
  },
];

export const ACCESSORY_CATEGORIES: AccessoryCategory[] = [
  'All',
  'Circuit & Surge Protection',
  'Distribution & Metering',
  'Cabling, Earthing & Mounting',
  'Storage & Safety',
];

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  {
    id: 'ac-circuit-breakers',
    name: 'AC Circuit Breakers',
    category: 'Circuit & Surge Protection',
    ratingSpec: '16A – 630A · 230V / 400V AC',
    standard: 'IEC 60898 / IEC 60947-2',
    summary:
      'Dedicated single-phase and three-phase AC overcurrent breakers protecting inverter output lines and main AC feeder circuits.',
    integrationRole:
      'Isolates AC overloads and short circuits between the inverter output and facility distribution board.',
    keySpecs: [
      { label: 'Rated Voltage', value: '230V / 400V AC' },
      { label: 'Poles', value: '2P / 3P / 4P' },
      { label: 'Trip Curve', value: 'Type C / Adjustable' },
    ],
  },
  {
    id: 'dc-circuit-breakers',
    name: 'DC Circuit Breakers',
    category: 'Circuit & Surge Protection',
    ratingSpec: '16A – 250A · up to 1500V DC',
    standard: 'IEC 60947-2 DC',
    summary:
      'High-voltage DC circuit breakers engineered with arc-extinguishing chambers specifically for PV array strings and DC buses.',
    integrationRole:
      'Protects solar array strings and MPPT inverter inputs against reverse currents and DC short-circuit faults.',
    keySpecs: [
      { label: 'DC Voltage Rating', value: '500V / 1000V / 1500V DC' },
      { label: 'Breaking Capacity', value: '6 kA – 20 kA' },
      { label: 'Mounting', value: '35mm DIN-Rail' },
    ],
  },
  {
    id: 'mcb-and-mccb',
    name: 'MCB and MCCB',
    category: 'Circuit & Surge Protection',
    ratingSpec: '6A – 1600A · Coordinated Fault Clearing',
    standard: 'IEC 60947-2',
    summary:
      'Coordinated miniature circuit breakers (MCB) and molded case circuit breakers (MCCB) for branch circuits and high-fault industrial incomers.',
    integrationRole:
      'Provides selective overcurrent protection across residential sub-boards and commercial/industrial main switchgear.',
    keySpecs: [
      { label: 'Icu Breaking Rating', value: '10 kA – 70 kA' },
      { label: 'Trip Unit', value: 'Thermal-Magnetic / Electronic' },
      { label: 'Configuration', value: '2P / 3P / 4P' },
    ],
  },
  {
    id: 'dc-isolators',
    name: 'DC Isolators',
    category: 'Circuit & Surge Protection',
    ratingSpec: '32A – 63A · 1000V / 1500V DC',
    standard: 'IEC 60947-3 DC-PV2',
    summary:
      'Padlockable rotary load-break DC disconnect switches designed for rapid, safe shutdown of PV strings under full load.',
    integrationRole:
      'Mounted adjacent to array combiners and inverters for safe mechanical isolation during service or emergencies.',
    keySpecs: [
      { label: 'Enclosure Class', value: 'IP66 UV-Stabilized' },
      { label: 'Switching Duty', value: 'DC-PV2 Load Break' },
      { label: 'Arc Quench', value: '< 5 ms Rotary Break' },
    ],
  },
  {
    id: 'surge-protection-devices',
    name: 'Surge Protection Devices (SPD)',
    category: 'Circuit & Surge Protection',
    ratingSpec: 'Type 1+2 & Type 2 · 40kA Imax',
    standard: 'EN 50539-11 / IEC 61643',
    summary:
      'Pluggable MOV and spark-gap surge arresters with visual status flags for transient lightning and utility switching surges.',
    integrationRole:
      'Clamps high-voltage spikes on both rooftop DC lines and AC utility feeders before they damage sensitive inverter electronics.',
    keySpecs: [
      { label: 'Max Discharge', value: 'Imax 40 kA (8/20µs)' },
      { label: 'DC Variants', value: '600V / 1000V / 1500V DC' },
      { label: 'Maintenance', value: 'Hot-Swappable Cartridges' },
    ],
  },
  {
    id: 'ac-dc-distribution-boxes',
    name: 'AC/DC Distribution Boxes',
    category: 'Distribution & Metering',
    ratingSpec: '1-in-1-out up to 16-in-4-out',
    standard: 'IEC 61439-2 · IP65 / IP66',
    summary:
      'Pre-wired, weather-sealed ACDB and DCDB enclosures integrating circuit breakers, isolators, SPDs, busbars, and labeled terminal blocks.',
    integrationRole:
      'Centralizes array string combining and AC protection into a clean, serviceable distribution assembly.',
    keySpecs: [
      { label: 'Ingress Protection', value: 'IP65 / IP66 Rated' },
      { label: 'Busbar', value: 'Electrolytic Tinned Copper' },
      { label: 'Termination', value: 'Bootlace Ferrules & Cable Glands' },
    ],
  },
  {
    id: 'smart-meters',
    name: 'Smart Meters',
    category: 'Distribution & Metering',
    ratingSpec: '1-Phase & 3-Phase · RS485 Modbus',
    standard: 'IEC 62053-21 · Class 0.5S / 1',
    summary:
      'Bidirectional digital energy meters tracking solar generation, facility load, grid import, and export power in real time.',
    integrationRole:
      'Feeds real-time load telemetry to inverters for zero-export throttling, net metering verification, and energy audits.',
    keySpecs: [
      { label: 'Accuracy Class', value: 'Class 0.5S / 1.0' },
      { label: 'Interface', value: 'RS485 Modbus RTU' },
      { label: 'Display', value: 'Backlit Multi-Parameter LCD' },
    ],
  },
  {
    id: 'ct-sensors',
    name: 'CT Sensors',
    category: 'Distribution & Metering',
    ratingSpec: '50A – 2000A · Split-Core & Solid-Core',
    standard: 'IEC 61869-2',
    summary:
      'Precision current transformers sized for residential incomers up to heavy industrial busbars without cutting primary cables.',
    integrationRole:
      'Measures directional phase current at the grid connection point for smart meters and zero-export controllers.',
    keySpecs: [
      { label: 'Primary Range', value: '50A – 2000A AC' },
      { label: 'Form Factor', value: 'Hinged Split-Core / Ring' },
      { label: 'Aperture', value: '16mm – 120mm' },
    ],
  },
  {
    id: 'changeover-switches',
    name: 'Changeover Switches',
    category: 'Distribution & Metering',
    ratingSpec: '40A – 800A · Manual & Automatic',
    standard: 'IEC 60947-6-1',
    summary:
      '4-pole break-before-make manual and automatic transfer switches (ATS) with mechanical and electrical interlocks.',
    integrationRole:
      'Transfers essential facility loads cleanly between solar/inverter output, utility grid, and backup generators.',
    keySpecs: [
      { label: 'Configuration', value: '4-Pole I-O-II Interlocked' },
      { label: 'ATS Transfer', value: '< 1.2 s Motorized' },
      { label: 'Current Rating', value: '40A – 800A' },
    ],
  },
  {
    id: 'bypass-switches',
    name: 'Bypass Switches',
    category: 'Distribution & Metering',
    ratingSpec: '32A – 630A · Manual & Auto Bypass',
    standard: 'IEC 60947-3',
    summary:
      'Dedicated inverter bypass switches allowing facility power to run directly from the utility grid while an inverter is isolated for service.',
    integrationRole:
      'Ensures zero operational downtime during inverter maintenance, upgrades, or troubleshooting.',
    keySpecs: [
      { label: 'Operation', value: 'Inverter / Bypass Selector' },
      { label: 'Contacts', value: 'Silver-Alloy Break-Before-Make' },
      { label: 'Enclosure', value: 'Panel Mount / IP65 Box' },
    ],
  },
  {
    id: 'ac-and-dc-cables',
    name: 'AC and DC Cables',
    category: 'Cabling, Earthing & Mounting',
    ratingSpec: '4mm²–16mm² DC · XLPE AC Feeders',
    standard: 'EN 50618 / TÜV 2PfG 1169',
    summary:
      'Double-insulated, UV-resistant tinned copper DC solar cables paired with armored/XLPE AC power conductors.',
    integrationRole:
      'Delivers low-loss power transmission from rooftop arrays to inverters and main electrical panels for 25+ years.',
    keySpecs: [
      { label: 'DC Voltage Rating', value: '1500V DC Twin-Wall' },
      { label: 'Conductor', value: 'Class 5 Tinned Copper' },
      { label: 'Temp Range', value: '-40°C to +90°C (+120°C Max)' },
    ],
  },
  {
    id: 'solar-connectors',
    name: 'Solar Connectors',
    category: 'Cabling, Earthing & Mounting',
    ratingSpec: 'IP68 · 1500V DC · 30A–50A',
    standard: 'IEC 62852',
    summary:
      'Waterproof, UV-stabilized crimp-locked male/female PV connectors and Y-branch parallel adapters.',
    integrationRole:
      'Creates low-resistance, moisture-sealed string terminations that prevent hot-spots and connector arcing.',
    keySpecs: [
      { label: 'Ingress Protection', value: 'IP68 Mated' },
      { label: 'Contact Resistance', value: '≤ 0.5 mΩ' },
      { label: 'Cable Acceptance', value: '4mm² / 6mm² / 10mm²' },
    ],
  },
  {
    id: 'earthing-systems',
    name: 'Earthing Systems',
    category: 'Cabling, Earthing & Mounting',
    ratingSpec: '< 2Ω Earth Pit · Copper-Bonded',
    standard: 'IEC 62305 / IEEE 80',
    summary:
      'Copper-bonded ground rods, conductive backfill compound, test-link pits, and braided equipotential bonding straps.',
    integrationRole:
      'Grounds PV module frames, mounting structures, inverter chassis, and surge arresters for shock and fault safety.',
    keySpecs: [
      { label: 'Target Resistance', value: '< 1.5 Ω Dedicated Pit' },
      { label: 'Electrode Coating', value: '250µm Copper-Bonded' },
      { label: 'Bonding Bus', value: '25×3mm Copper / Braided Strap' },
    ],
  },
  {
    id: 'lightning-protection',
    name: 'Lightning Protection',
    category: 'Cabling, Earthing & Mounting',
    ratingSpec: 'Air Terminals & Down Conductors',
    standard: 'IEC 62305',
    summary:
      'Rooftop Franklin / ESE lightning air-termination masts, insulated standoffs, and dedicated low-impedance down conductors.',
    integrationRole:
      'Intercepts direct lightning strikes above the solar array envelope and routes discharge safely to dedicated ground pits.',
    keySpecs: [
      { label: 'Protection Zone', value: 'Rolling Sphere / ESE Radius' },
      { label: 'Mast Material', value: 'Copper / Stainless Steel' },
      { label: 'Discharge Path', value: 'Isolated Down Conductor' },
    ],
  },
  {
    id: 'solar-mounting-structures',
    name: 'Solar Mounting Structures',
    category: 'Cabling, Earthing & Mounting',
    ratingSpec: 'L2 / Elevated / Flush AL6005-T5',
    standard: 'AS/NZS 1170 / Eurocode 1',
    summary:
      'Anodized aluminum rails, galvanized L2 and elevated structures, non-penetrating standing-seam clamps, and SS304 fasteners.',
    integrationRole:
      'Anchors PV modules at optimal tilt angles across concrete, metal, and tiled roofs against high wind uplift.',
    keySpecs: [
      { label: 'Materials', value: 'AL6005-T5 & ≥80µm HDG Steel' },
      { label: 'Fasteners', value: 'A2-70 SS304 Stainless' },
      { label: 'Structure Types', value: 'L2 · Elevated · Flush · Ballasted' },
    ],
  },
  {
    id: 'battery-protection-accessories',
    name: 'Battery Protection Accessories',
    category: 'Storage & Safety',
    ratingSpec: '48V–800V DC · 125A–400A',
    standard: 'IEC 60269 / UL 1973 Ready',
    summary:
      'High-rupture NH-00 DC fuse disconnectors, battery MCCBs, copper inter-rack jumpers, and shielded CAN/RS485 BMS cables.',
    integrationRole:
      'Protects low-voltage and high-voltage lithium battery banks from dead-shorts while maintaining reliable BMS communication.',
    keySpecs: [
      { label: 'Breaker / Fuse', value: '125A – 400A High-Icu DC' },
      { label: 'BMS Harnesses', value: 'Shielded CAN / RS485 RJ45' },
      { label: 'Power Connectors', value: 'Quick-Lock HV Plugs' },
    ],
  },
  {
    id: 'electrical-safety-equipment',
    name: 'Electrical Safety Equipment',
    category: 'Storage & Safety',
    ratingSpec: '1000V Insulated · Lockout & Labels',
    standard: 'IEC 60900 / OSHA Compliant',
    summary:
      'Insulated commissioning tools, LOTO breaker lockouts, dual-supply solar warning signage, arc-rated gloves, and fire-retardant conduit.',
    integrationRole:
      'Equips electrical rooms and maintenance teams for safe solar isolation, testing, and ongoing service compliance.',
    keySpecs: [
      { label: 'Tool Insulation', value: '1000V VDE Certified' },
      { label: 'Signage', value: 'UV-Resistant Dual-Supply Labels' },
      { label: 'Isolation Safety', value: 'Padlockable LOTO Kits' },
    ],
  },
];

export const BRANDS_SHOWCASE: BrandItem[] = [
  {
    name: 'Solis',
    domain: 'Inverters & Power Electronics',
    technologyNote: 'String on-grid, zero-export & three-phase commercial inverters',
  },
  {
    name: 'GoodWe',
    domain: 'Inverters & Power Electronics',
    technologyNote: 'Residential, commercial & high-voltage hybrid inverter systems',
  },
  {
    name: 'Huawei',
    domain: 'Inverters & Power Electronics',
    technologyNote: 'Smart PV string inverters & commercial/industrial energy controllers',
  },
  {
    name: 'Zing',
    domain: 'Inverters & Power Electronics',
    technologyNote: 'Solar inverter & hybrid power management platforms',
  },
  {
    name: 'Pylontech',
    domain: 'Lithium Energy Storage',
    technologyNote: 'Low-voltage & high-voltage modular LiFePO4 battery racks with BTU/BMS',
  },
  {
    name: 'Longi',
    domain: 'Photovoltaic Modules',
    technologyNote: 'High-efficiency monocrystalline & bifacial solar PV modules',
  },
  {
    name: 'Jinko',
    domain: 'Photovoltaic Modules',
    technologyNote: 'N-type TOPCon & commercial-grade photovoltaic panels',
  },
];

export const WHY_CHOOSE_POINTS: { number: string; title: string; detail: string }[] = [
  {
    number: '01.',
    title: 'Professional solar installation team',
    detail:
      'Dedicated field technicians and electrical installers trained in clean mounting, conduit routing, and safe termination practices.',
  },
  {
    number: '02.',
    title: 'Residential to industrial expertise',
    detail:
      'Scalable engineering workflow covering single-home rooftops, commercial plazas, and multi-inverter industrial plants.',
  },
  {
    number: '03.',
    title: 'Complete solar system solutions',
    detail:
      'Single-point responsibility from initial load study and layout planning through final testing and handover.',
  },
  {
    number: '04.',
    title: 'Advanced inverter technologies',
    detail:
      'Hands-on configuration across on-grid, hybrid, zero-export, and high-voltage three-phase inverter platforms.',
  },
  {
    number: '05.',
    title: 'Professional commissioning',
    detail:
      'Structured parameter programming, BMS handshake verification, CT calibration, and sustained load testing before handover.',
  },
  {
    number: '06.',
    title: 'Quality electrical installation',
    detail:
      'Neat trunking, ferrule-terminated wiring, properly rated conductors, and labeled AC/DC distribution enclosures.',
  },
  {
    number: '07.',
    title: 'Technical troubleshooting',
    detail:
      'Fast root-cause diagnostics for inverter faults, string imbalances, battery BMS alarms, and zero-export trips.',
  },
  {
    number: '08.',
    title: 'Reliable customer support',
    detail:
      'Direct consultation and responsive post-installation technical assistance led by Ayub Masih.',
  },
  {
    number: '09.',
    title: 'Complete AC/DC protection solutions',
    detail:
      'Full integration of MCBs, MCCBs, DC isolators, SPDs, changeover/bypass switches, earthing, and lightning protection.',
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Residential Projects',
  'Commercial Projects',
  'Industrial Projects',
  'On-Grid Installations',
  'Hybrid Installations',
  'High Voltage Battery Projects',
  'Inverter Installations',
  'Solar Accessories & Electrical Work',
];

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'case-residential-sparta',
    sector: 'residential',
    primaryCategory: 'Residential Projects',
    categories: [
      'Residential Projects',
      'Hybrid Installations',
      'Inverter Installations',
      'Solar Accessories & Electrical Work',
    ],
    provenance: 'Actual Synsolarise Site',
    title: '12-Panel L2 Rooftop & 10 kW Lithium Hybrid Residence',
    location: 'Completed Residential Site · IP66 Hybrid System',
    systemSizeKw: '6.6 kW',
    annualProductionKwh: '10,850 kWh',
    commissioningHighlight: '12 Panels on L2 Frame · 10 kW Li-Ion Storage',
    clientNeeds:
      'The homeowner needed dependable daytime solar power paired with quiet, automatic lithium battery backup to keep essential home loads running smoothly during grid outages.',
    solutionProvided:
      'Synsolarise installed 12 solar panels on a galvanized L2 rooftop structure, mounted an IP66 6.6 kW Sparta Series hybrid inverter with a 10 kW lithium-ion battery, and wired a complete AC/DC protection and changeover enclosure.',
    equipmentDeployed: [
      '12 Solar Panels on Galvanized L2 Mounting Frame',
      'IP66 6.6 kW Hybrid Inverter & 10 kW Lithium-Ion Battery',
      'AC/DC Distribution Box, Breakers, SPD & Changeover Protection',
    ],
    media: [
      {
        label: 'Site Completed Showcase',
        type: 'image',
        src: UPLOADED_MEDIA.siteCompletedPoster,
        alt: 'Completed Synsolarise 12-panel L2 frame residential solar installation with IP66 6.6 kW inverter and 10 kW lithium-ion battery',
      },
      {
        label: 'On-Site Inverter & Battery Room',
        type: 'image',
        src: UPLOADED_MEDIA.onsiteInverterTeam,
        alt: 'Synsolarise team standing beside installed IP66 inverter, protection distribution board, and lithium battery',
      },
      {
        label: '6-Step Installation Process',
        type: 'image',
        src: UPLOADED_MEDIA.stepByStepPoster,
        alt: 'Synsolarise step-by-step installation workflow showing inverter unboxing, panel fitting, battery fitting, wiring, and testing',
      },
    ],
  },
  {
    id: 'case-commercial-hv-storage',
    sector: 'commercial',
    primaryCategory: 'High Voltage Battery Projects',
    categories: [
      'Commercial Projects',
      'Hybrid Installations',
      'High Voltage Battery Projects',
      'Inverter Installations',
    ],
    provenance: 'Actual Synsolarise Site',
    title: 'Dual 50 kW High-Voltage Inverter & 11-Module Pylontech ESS',
    location: 'Completed High-Voltage Storage Site · 50 kW + 50 kW',
    systemSizeKw: '100 kW',
    annualProductionKwh: '158,000 kWh',
    commissioningHighlight: '11 Pylontech HV Batteries · 1 BTU · Parallel Sync',
    clientNeeds:
      'The client required high-capacity three-phase solar power backed by a high-voltage lithium battery bank capable of supporting heavy commercial loads with coordinated BMS safety.',
    solutionProvided:
      'Synsolarise installed dual 50 kW high-voltage inverters in parallel alongside 11 Pylontech HV battery modules managed by 1 BTU controller, complete with armored DC links, MCCB protection, and parameter commissioning.',
    equipmentDeployed: [
      '50 kW + 50 kW Dual High-Voltage Hybrid Inverter System',
      '11 Pylontech HV Battery Modules with 1 BTU Control Unit',
      'High-Voltage DC Protection, BMS Comms & MCCB Switchgear',
    ],
    media: [
      {
        label: 'Site Walkthrough Video',
        type: 'video',
        src: UPLOADED_MEDIA.promoVideo,
        alt: 'Synsolarise 50 kW plus 50 kW high-voltage solar and 11 Pylontech HV battery installation walkthrough video',
      },
      {
        label: 'Protection Switchgear View',
        type: 'image',
        src: GENERATED_IMAGES.distributionPanel,
        alt: 'Reference view of AC/DC electrical distribution protection panel with MCB, MCCB, DC isolator, SPD, and smart meter',
      },
    ],
  },
  {
    id: 'case-commercial-ongrid-zero-export',
    sector: 'commercial',
    primaryCategory: 'Commercial Projects',
    categories: [
      'Commercial Projects',
      'On-Grid Installations',
      'Inverter Installations',
    ],
    provenance: 'Illustrative Reference Sample',
    title: 'Commercial Plaza On-Grid & Zero Export Rooftop Array',
    location: 'Reference Sample · Three-Phase 400V',
    systemSizeKw: '150 kW',
    annualProductionKwh: '228,000 kWh',
    commissioningHighlight: 'Smart Meter + CT Zero Export · Net Metering Ready',
    clientNeeds:
      'Commercial plazas and office buildings face steep daytime air-conditioning and elevator electricity bills while needing strict export limitation before utility net-metering approval.',
    solutionProvided:
      'Sample configuration deploying multi-MPPT commercial string inverters, three-phase smart meters with split-core CT sensors for zero-export control, and weatherproof AC/DC protection boxes.',
    equipmentDeployed: [
      'Three-Phase Commercial String Inverters (On-Grid / Zero Export)',
      'Bidirectional Smart Meter & Split-Core CT Sensors',
      'IP66 AC/DC Distribution Boards & Type 1+2 Surge Arresters',
    ],
    media: [
      {
        label: 'After · Inverter & Switchgear',
        type: 'image',
        src: GENERATED_IMAGES.commissioning,
        alt: 'Sample commercial solar inverter commissioning and AC distribution testing',
      },
      {
        label: 'Before / Mounting & Earthing',
        type: 'image',
        src: GENERATED_IMAGES.mountingCabling,
        alt: 'Sample anodized solar mounting structure with UV-rated DC cabling and copper earthing strap',
      },
    ],
  },
  {
    id: 'case-industrial-epc',
    sector: 'industrial',
    primaryCategory: 'Industrial Projects',
    categories: [
      'Industrial Projects',
      'On-Grid Installations',
      'Solar Accessories & Electrical Work',
    ],
    provenance: 'Illustrative Reference Sample',
    title: 'Industrial Manufacturing Plant Solar & Switchgear Integration',
    location: 'Reference Sample · 415V LT / Industrial Grid',
    systemSizeKw: '500 kW',
    annualProductionKwh: '765,000 kWh',
    commissioningHighlight: '1500V DC Protection · MCCB & Earthing Grid',
    clientNeeds:
      'Industrial facilities require megawatt-class daytime cost reduction engineered with high fault-capacity breakers, generator/grid synchronization, and lightning protection.',
    solutionProvided:
      'Sample industrial architecture utilizing wind-rated mounting structures, 1500V DC isolators and breakers, high-Icu MCCB switchgear, automatic changeover/bypass, and low-impedance earthing.',
    equipmentDeployed: [
      'High-Capacity Industrial String Inverters & XLPE AC Feeders',
      '800A MCCB Switchboard, Automatic Changeover & Bypass',
      'IEC 62305 Lightning Protection & Copper-Bonded Earth Pits',
    ],
    media: [
      {
        label: 'After · Completed Industrial Array',
        type: 'image',
        src: GENERATED_IMAGES.hero,
        alt: 'Sample industrial rooftop photovoltaic array with galvanized electrical conduit runs',
      },
      {
        label: 'Protection Distribution Panel',
        type: 'image',
        src: GENERATED_IMAGES.distributionPanel,
        alt: 'Sample industrial AC and DC protection box with MCCB, MCB, SPD, and smart energy meter',
      },
    ],
  },
  {
    id: 'case-accessories-electrical-work',
    sector: 'residential',
    primaryCategory: 'Solar Accessories & Electrical Work',
    categories: [
      'Residential Projects',
      'Solar Accessories & Electrical Work',
      'Hybrid Installations',
    ],
    provenance: 'Illustrative Reference Sample',
    title: 'AC/DC Protection Panel, Earthing & Mounting Craftsmanship',
    location: 'Reference Sample · IEC Electrical Protection',
    systemSizeKw: '15 kW',
    annualProductionKwh: '23,400 kWh',
    commissioningHighlight: 'Complete AC/DC Protection · Bonded Earthing',
    clientNeeds:
      'Home and facility owners upgrading existing solar systems often require properly coordinated breakers, surge arresters, changeover bypasses, and dedicated earthing to eliminate tripping and surge risks.',
    solutionProvided:
      'Sample protection retrofit combining factory-dressed AC/DC distribution boxes, rotary DC isolators, Type 2 SPDs, maintenance bypass switching, and braided structural copper grounding.',
    equipmentDeployed: [
      'AC & DC Circuit Breakers, DC Isolators & Type 2 SPDs',
      'Changeover & Maintenance Bypass Switch Assembly',
      '4mm²/6mm² TÜV DC Cable, IP68 Connectors & Copper Earthing',
    ],
    media: [
      {
        label: 'AC/DC Protection Box',
        type: 'image',
        src: GENERATED_IMAGES.distributionPanel,
        alt: 'Sample wired AC/DC solar protection box with DC isolator, MCBs, MCCB, SPD, and smart meter',
      },
      {
        label: 'Mounting & Copper Earthing',
        type: 'image',
        src: GENERATED_IMAGES.mountingCabling,
        alt: 'Sample anodized solar mounting rail with bonded copper earthing and solar DC connectors',
      },
    ],
  },
];

export type FaqCategory =
  | 'All'
  | 'Solar Installation'
  | 'Net Metering'
  | 'Maintenance & Protection';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  'All',
  'Solar Installation',
  'Net Metering',
  'Maintenance & Protection',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-planning-sizing',
    category: 'Solar Installation',
    question: 'How does SYNSOLARISE plan and size a solar system for my home, shop, or factory?',
    answer:
      'We evaluate your electricity bills, connected daytime and nighttime loads, roof orientation, and backup goals before recommending panel capacity, inverter type, mounting structure (such as L2 or elevated frames), and matching AC/DC protection switchgear.',
  },
  {
    id: 'faq-system-types',
    category: 'Solar Installation',
    question: 'What is the difference between on-grid, hybrid, and zero-export solar systems?',
    answer:
      'On-grid systems synchronize with the utility grid and export surplus solar power for net metering. Hybrid systems combine solar panels with battery storage so essential loads stay powered during outages. Zero-export systems use a smart meter and CT sensors to match site demand dynamically without feeding power back into the grid.',
  },
  {
    id: 'faq-hv-battery',
    category: 'Solar Installation',
    question:
      'Can SYNSOLARISE install high-voltage lithium battery storage for larger homes or commercial and industrial sites?',
    answer:
      'Yes. We design, wire, and commission high-voltage lithium battery banks—including multi-module racks, Battery Control Unit (BTU) integration, parallel configurations, and closed-loop BMS communication with compatible high-voltage inverters.',
  },
  {
    id: 'faq-protection-gear',
    category: 'Solar Installation',
    question: 'What AC and DC electrical protection equipment is included in an installation?',
    answer:
      'Depending on system size, installations integrate properly rated AC and DC circuit breakers, MCBs and MCCBs, lockable DC isolators, Surge Protection Devices (SPD), weatherproof AC/DC distribution boxes, changeover and bypass switches, dedicated earthing pits, and lightning protection.',
  },
  {
    id: 'faq-net-metering-how',
    category: 'Net Metering',
    question: 'How does net metering work with an on-grid or hybrid solar system?',
    answer:
      'During sunny hours, surplus electricity generated beyond your site consumption is exported to the utility grid through a bidirectional smart meter, offsetting electricity units imported at night or during peak demand according to your local utility rules.',
  },
  {
    id: 'faq-before-net-metering',
    category: 'Net Metering',
    question:
      'Can I use my solar system safely before net metering approval is completed?',
    answer:
      'Yes. SYNSOLARISE installs and configures zero-export devices with CT sensors and smart meters so your system powers your daytime load immediately while limiting reverse power export until your bidirectional meter is commissioned.',
  },
  {
    id: 'faq-commercial-ct',
    category: 'Net Metering',
    question:
      'How do smart meters and CT sensors prevent reverse export on commercial and industrial feeders?',
    answer:
      'Split-core or solid-core Current Transformers (CTs) measure real-time current direction across all three phases at the main incomer. The smart meter communicates via RS485 to the inverter so solar output throttles smoothly to match active facility load.',
  },
  {
    id: 'faq-routine-maintenance',
    category: 'Maintenance & Protection',
    question: 'What routine maintenance does a solar energy installation require?',
    answer:
      'Solar panels should be washed periodically with clean water to clear dust and bird droppings, while electrical rooms benefit from periodic inspection of breaker tightness, SPD indicator flags, earthing pit moisture, and inverter firmware or fault logs.',
  },
  {
    id: 'faq-changeover-bypass',
    category: 'Maintenance & Protection',
    question:
      'Why do SYNSOLARISE installations include changeover and bypass switches?',
    answer:
      'Automatic changeover systems manage seamless source switching between solar, battery, grid, and backup sources, while dedicated bypass switches allow your building to draw utility power directly if an inverter ever needs maintenance or parameter servicing.',
  },
  {
    id: 'faq-commissioning-troubleshooting',
    category: 'Maintenance & Protection',
    question:
      'Does SYNSOLARISE provide inverter programming, troubleshooting, and post-installation support?',
    answer:
      'Yes. Beyond initial installation, we handle inverter parameter configuration, BMS communication setup, zero-export testing, fault diagnostics, and technical support led by Ayub Masih (03453273342 / 038082347023).',
  },
];

