import { MethodDTO } from './MethodDTO';

export type MethodUpdateDTO = Partial<Omit<MethodDTO, 'id'>>;
