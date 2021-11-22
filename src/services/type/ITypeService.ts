import { TypeDTO } from '../../common/dtos/type/TypeDTO';

export interface ITypeService {
  getAllTypes(): Promise<TypeDTO[]>;
  getTypeById(id: number): Promise<TypeDTO>;
}
