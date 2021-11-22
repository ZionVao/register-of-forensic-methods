import { MethodCreateDTO } from '../../common/dtos/method/MethodCreateDTO';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { MethodUpdateDTO } from '../../common/dtos/method/MethodUpdateDTO';
import { MethodFilter } from '../interfaces/interfaces';

export interface IMethodService {
  getAllMethods(
    filter: MethodFilter,
  ): Promise<{ methods: MethodDTO[]; count: number }>;
  getMethod(id: number): Promise<MethodDTO>;
  addMethod(payload: MethodCreateDTO): Promise<{ id: number }>;
  updateMetod(id: number, metod: MethodUpdateDTO): Promise<{ id: number }>;
}
