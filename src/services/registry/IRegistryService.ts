import { UserDTO } from '../../common/dtos/user/UserDTO';
import { Filter } from '../interfaces/interfaces';

export interface IRegistryService {
  getAllRegistry(filter: Filter): Promise<UserDTO[]>;
  getRegistry(id: number): Promise<UserDTO>;
  addRegistry(): Promise<boolean>;
  deleteRegisty(id: number): Promise<boolean>;
  sendDataForRegistry(id: number): Promise<boolean>;
}
