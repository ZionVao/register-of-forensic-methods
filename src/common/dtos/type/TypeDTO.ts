import { DomainDTO } from '../domain/DomainDTO';

export interface TypeDTO {
  id: number;
  name: string;
  domains: DomainDTO[];
}
