import { TypeDTO } from '../type/TypeDTO';

export interface DomainDTO {
  id: number;
  name: string;
  id_types: number;
  typesOfMethods: TypeDTO;
}
