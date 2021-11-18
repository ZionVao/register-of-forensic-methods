import { MethodCreateDTO } from '../../common/dtos/method/MethodCreateDTO';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { MethodUpdateDTO } from '../../common/dtos/method/MethodUpdateDTO';
import { Filter } from '../interfaces/interfaces';

export interface IMethodService {
  getAllMethods(filter: Filter): Promise<MethodDTO[]>;
  getMethod(id: number): Promise<MethodDTO>;
  addMethod(payload: MethodCreateDTO): Promise<MethodDTO>;
  updateMetod(metod: MethodUpdateDTO): Promise<boolean>;
  deleteMethod(id: number): Promise<boolean>;
  getTotallCount(): Promise<number>;
}
