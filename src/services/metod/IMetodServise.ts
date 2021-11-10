import { MetodCreateDTO } from '../../common/dtos/metod/MetodCreateDTO';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';
import { MetodUpdateDTO } from '../../common/dtos/metod/MetodUpdateDTO';
import { Filter } from './metod.service';

export interface IMetodService {
  getAllMethods(filter: Filter): Promise<MetodDTO[]>;
  getMethod(id: number): Promise<MetodDTO>;
  addMethod(payload: MetodCreateDTO): Promise<MetodDTO>;
  updateMetod(metod: MetodUpdateDTO): Promise<boolean>;
}
