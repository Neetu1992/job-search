export interface Job {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  isSelected: boolean;
}

export interface JobDescription {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  location: string;
  industries: Array<string>;
  types: Array<string>;
  description: string;
  publishDate: string;
}
