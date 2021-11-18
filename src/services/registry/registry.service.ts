import { UserDTO } from '../../common/dtos/user/UserDTO';
import { IHttpService } from '../http/IHttpServise';
import { Filter } from '../interfaces/interfaces';
import { IRegistryService } from './IRegistryService';

export class RegistryService implements IRegistryService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }
  async getAllRegistry(filter: Filter): Promise<UserDTO[]> {
    throw new Error('Method not implemented.');
  }
  async getRegistry(id: number): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  async addRegistry(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async deleteRegisty(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async sendDataForRegistry(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
