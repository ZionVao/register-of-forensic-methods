export interface DomainData {
  id: number;
  name: string;
}

export interface TypeData {
  name: string;
  id_types: number;
  domains: DomainData[];
}

export interface Section {
  [x: number]: TypeData;
}

export type Checked = { [key: string]: { status: boolean } };
