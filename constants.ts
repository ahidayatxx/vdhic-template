import { GroupConfig, SectionId } from './types';
import { 
  Shield, 
  Stethoscope, 
  Lock, 
  Server, 
  Target, 
  Users, 
  Map, 
  Cpu, 
  Smartphone, 
  Database, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  Scale, 
  Globe, 
  Heart, 
  Smile, 
  DollarSign 
} from 'lucide-react';

export const INITIAL_STATE: Record<SectionId, string> = {
  gov_regulatory: '',
  gov_clinical: '',
  gov_data: '',
  gov_tech: '',
  disc_challenge: '',
  disc_users: '',
  disc_stakeholders: '',
  des_arch: '',
  des_ux: '',
  des_integration: '',
  del_evidence: '',
  del_scale: '',
  del_business: '',
  val_equity: '',
  val_population: '',
  val_patient: '',
  val_provider: '',
  val_cost: '',
};

export const INITIAL_METADATA = {
  innovationName: '',
  date: new Date().toISOString().split('T')[0],
  author: ''
};

export const GOVERNANCE_CONFIG: GroupConfig = {
  title: "GOVERNANCE SPINE — Safety, Compliance & Technology Framework",
  colorClass: "text-white",
  borderColorClass: "border-gov",
  bgColorClass: "bg-gov",
  sections: [
    {
      id: 'gov_regulatory',
      title: "Regulatory Pathway",
      prompts: ["BPOM Classification", "Sandbox", "TKDN", "ISO 13485"],
      instruction: `
        <p class="mb-2 font-semibold">Compliance with laws and standards.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What regulatory classification applies (BPOM medical device, wellness app)?</li>
          <li>Is Regulatory Sandbox participation appropriate for your innovation?</li>
          <li>What TKDN (local content) requirements apply?</li>
          <li>What certifications are required (ISO 13485, IEC 62304)?</li>
        </ul>
      `
    },
    {
      id: 'gov_clinical',
      title: "Clinical Governance",
      prompts: ["Protocols", "Patient Safety", "Adverse Events", "PNPK"],
      instruction: `
        <p class="mb-2 font-semibold">Patient safety and clinical quality.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What clinical protocols govern the intervention?</li>
          <li>How will clinical oversight be maintained?</li>
          <li>What adverse event reporting mechanisms exist?</li>
          <li>How does this align with PNPK (clinical guidelines)?</li>
        </ul>
      `
    },
    {
      id: 'gov_data',
      title: "Data Governance",
      prompts: ["UU PDP", "PP 71/2019", "Consent", "Security Standards"],
      instruction: `
        <p class="mb-2 font-semibold">Privacy and data protection.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>How will you ensure UU PDP and PP 71/2019 compliance?</li>
          <li>What data minimization principles apply?</li>
          <li>How will consent be obtained and managed?</li>
          <li>What data retention and deletion policies apply?</li>
        </ul>
      `
    },
    {
      id: 'gov_tech',
      title: "Technology Governance",
      prompts: ["Architecture", "Cybersecurity", "API", "DR/BC"],
      instruction: `
        <p class="mb-2 font-semibold">System reliability and security.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What is the system architecture (cloud, on-premise, hybrid)?</li>
          <li>What cybersecurity measures and standards apply (ISO 27001, encryption)?</li>
          <li>What API standards are used for system integration?</li>
          <li>What is the disaster recovery and business continuity plan (DR/BC)?</li>
          <li>How will version control and change management be handled?</li>
        </ul>
        <p class="mt-2 font-semibold text-xs">Indonesia-Specific Considerations:</p>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          <li>Data localization requirements</li>
          <li>Connectivity resilience (offline capability)</li>
        </ul>
      `
    },
  ]
};

export const DISCOVER_CONFIG: GroupConfig = {
  title: "DISCOVER",
  colorClass: "text-discover-text",
  borderColorClass: "border-discover-border",
  bgColorClass: "bg-discover-light",
  footer: "Mindset: Design Thinking – Empathy & Problem Definition",
  sections: [
    {
      id: 'disc_challenge',
      title: "1. HEALTH CHALLENGE",
      prompts: [
        "Health problem & epidemiological data?",
        "Mechanism of action?",
        "Barriers to solution?",
        "Renstra Kemenkes/SDGs alignment?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Problem identification.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What specific health problem are you solving?</li>
          <li>What is the current patient journey and pain points?</li>
          <li>How does this align with Renstra Kemenkes/SDGs?</li>
        </ul>
      `
    },
    {
      id: 'disc_users',
      title: "2. USER PROFILES",
      prompts: [
        "Primary users (Patients, Providers)?",
        "Demographics & digital literacy?",
        "Behaviors & motivations?",
        "Urban/rural & BPJS context?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Understanding your users.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Primary users: Patients, Providers, or Administrators?</li>
          <li>What are their behaviors, motivations, and constraints?</li>
          <li>Indonesia context: Urban/rural divide, BPJS segments?</li>
        </ul>
      `
    },
    {
      id: 'disc_stakeholders',
      title: "3. STAKEHOLDER MAP",
      prompts: [
        "Government (Kemenkes, BPOM)?",
        "Clinical & Professional orgs?",
        "Payers (BPJS, Insurance)?",
        "Industry & Academic partners?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Mapping the ecosystem.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Government, Clinical, Payer, Industry, and Academic stakeholders?</li>
          <li>Who are the champions and potential blockers?</li>
        </ul>
      `
    }
  ]
};

export const DESIGN_CONFIG: GroupConfig = {
  title: "DESIGN",
  colorClass: "text-design-text",
  borderColorClass: "border-design-border",
  bgColorClass: "bg-design-light",
  footer: "Mindset: Human-Centered Design – User Research",
  sections: [
    {
      id: 'des_arch',
      title: "4. SOLUTION ARCHITECTURE",
      prompts: [
        "Pillar (Medicine, Dx, Tx, Wellness)?",
        "Risk classification (Class I-III)?",
        "SaMD or hardware-integrated?",
        "Digital biomarkers?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Solution technical framework.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Which pillar: Digital Medicine, Diagnostics, Therapeutics, or Wellness?</li>
          <li>What risk classification applies (Class I, II, III)?</li>
        </ul>
      `
    },
    {
      id: 'des_ux',
      title: "5. USER EXPERIENCE",
      prompts: [
        "Core features?",
        "Usability (Nielsen, SUS)?",
        "Accessibility (Bahasa, Offline)?",
        "Engagement strategy?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Designing for usability.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>How will you ensure usability (Nielsen heuristics, SUS score target)?</li>
          <li>Accessibility: Bahasa Indonesia, offline mode capability?</li>
        </ul>
      `
    },
    {
      id: 'des_integration',
      title: "6. SATUSEHAT INTEGRATION",
      prompts: [
        "Integration approach?",
        "FHIR resources?",
        "HL7 standards?",
        "SIMRS/Pcare interoperability?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Interoperability and National Ecosystem.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Which FHIR resources will you implement?</li>
          <li>Technical readiness for national interoperability?</li>
        </ul>
      `
    }
  ]
};

export const DELIVER_CONFIG: GroupConfig = {
  title: "DELIVER",
  colorClass: "text-deliver-text",
  borderColorClass: "border-deliver-border",
  bgColorClass: "bg-deliver-light",
  footer: "Mindset: Dual Framework – Strategy + Reality",
  sections: [
    {
      id: 'del_evidence',
      title: "7. EVIDENCE PLAN",
      prompts: [
        "Pathway (Pilot → RCT → RWE)?",
        "Clinical endpoints?",
        "Study design & sample size?",
        "Cost-effectiveness metrics?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Validation and efficacy.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What is your evidence pathway: Pilot → RCT → Real-World Evidence?</li>
          <li>What clinical endpoints will demonstrate efficacy?</li>
        </ul>
      `
    },
    {
      id: 'del_scale',
      title: "8. SCALE STRATEGY",
      prompts: [
        "Go-to-market strategy?",
        "Pilot sites (Hospitals, Puskesmas)?",
        "Change management?",
        "National scale pathway?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Growth and adoption.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What change management approach for provider adoption?</li>
          <li>How will you scale from pilot to national deployment?</li>
        </ul>
      `
    },
    {
      id: 'del_business',
      title: "9. BUSINESS MODEL",
      prompts: [
        "Revenue model (B2B, B2C, B2G)?",
        "BPJS reimbursement?",
        "Private insurance strategy?",
        "Unit economics?"
      ],
      instruction: `
        <p class="mb-2 font-semibold">Sustainability and finance.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>What revenue model: B2B, B2C, or B2G?</li>
          <li>Potential BPJS reimbursement pathway (INACBGs, Kapitasi)?</li>
        </ul>
      `
    }
  ]
};

export const VALUE_ANCHOR_CONFIG: GroupConfig = {
  title: "VALUE ANCHOR — Quintuple Aim Outcomes",
  colorClass: "text-white",
  borderColorClass: "border-value",
  bgColorClass: "bg-value",
  sections: [
    {
      id: 'val_equity',
      title: "Health Equity",
      prompts: ["Accessible care for all", "Disparity reduction?"],
      instruction: `
        <p class="mb-2 font-semibold">How does this reduce healthcare disparities?</p>
      `
    },
    {
      id: 'val_population',
      title: "Population Health",
      prompts: ["Better outcomes at scale", "Clinical improvements?"],
      instruction: `
        <p class="mb-2 font-semibold">What clinical outcomes will improve at the population level?</p>
      `
    },
    {
      id: 'val_patient',
      title: "Patient Experience",
      prompts: ["Satisfaction & engagement", "Patient journey impact?"],
      instruction: `
        <p class="mb-2 font-semibold">How will patient satisfaction and engagement increase?</p>
      `
    },
    {
      id: 'val_provider',
      title: "Provider Satisfaction",
      prompts: ["Clinician well-being", "Workflow optimization?"],
      instruction: `
        <p class="mb-2 font-semibold">How will this improve clinician workflow and reduce burden?</p>
      `
    },
    {
      id: 'val_cost',
      title: "Cost Reduction",
      prompts: ["Efficiency gains", "Economic optimization?"],
      instruction: `
        <p class="mb-2 font-semibold">What efficiency gains are expected?</p>
      `
    },
  ]
};

export const ICON_MAP: Record<SectionId, any> = {
  gov_regulatory: Shield,
  gov_clinical: Stethoscope,
  gov_data: Lock,
  gov_tech: Server,
  disc_challenge: Target,
  disc_users: Users,
  disc_stakeholders: Map,
  des_arch: Cpu,
  des_ux: Smartphone,
  des_integration: Database,
  del_evidence: FileText,
  del_scale: TrendingUp,
  del_business: Briefcase,
  val_equity: Scale,
  val_population: Globe,
  val_patient: Heart,
  val_provider: Smile,
  val_cost: DollarSign,
};
