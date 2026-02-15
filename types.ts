export type SectionId =
  | 'gov_regulatory'
  | 'gov_clinical'
  | 'gov_data'
  | 'gov_tech'
  | 'disc_challenge'
  | 'disc_users'
  | 'disc_stakeholders'
  | 'des_arch'
  | 'des_ux'
  | 'des_integration'
  | 'del_evidence'
  | 'del_scale'
  | 'del_business'
  | 'val_equity'
  | 'val_population'
  | 'val_patient'
  | 'val_provider'
  | 'val_cost';

export type CanvasState = Record<SectionId, string>;

export interface CanvasMetadata {
  innovationName: string;
  date: string;
  author: string;
}

export interface FullCanvasData {
  metadata: CanvasMetadata;
  sections: CanvasState;
}

export interface SectionConfig {
  id: SectionId;
  title: string;
  icon?: string;
  prompts: string[];
  instruction?: string;
  placeholder?: string;
}

export interface GroupConfig {
  title: string;
  colorClass: string;
  borderColorClass: string;
  bgColorClass: string;
  sections: SectionConfig[];
  footer?: string;
}
