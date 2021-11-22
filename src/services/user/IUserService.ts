import { AddressDTO } from '../../common/dtos/address/AddressDTO';
import { UserCreateDTO } from '../../common/dtos/user/UserCreateDTO';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { UserFilter } from '../interfaces/interfaces';

export interface IUserService {
  getUsers(filter: UserFilter): Promise<{ users: UserDTO[]; count: number }>;
  getUserByToken(): Promise<UserDTO>;
  deleteUserById(id: number): Promise<{ id: number }>;
  postUser(user: UserCreateDTO): Promise<{ id: number }>;
  sendDataUser(id: number): Promise<{ email: string }>;
  login(payload: {
    email: string;
    password: string;
  }): Promise<{ Token: string }>;
  token(): Promise<{ Token: string }>;

  getPositions(): Promise<{ id: number; name: string }[]>;
  getAddresses(): Promise<AddressDTO[]>;
  getAuthorities(): Promise<
    { id: number; code: number; id_adress: number; name: string }[]
  >;
  getOrganizations(): Promise<{ id: number; name: string }[]>;
}
