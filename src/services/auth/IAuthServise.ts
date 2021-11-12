import { UserDTO } from '../../common/dtos/user/UserDTO';

export interface IAuthService {
  login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserDTO }>;
  registration(payload: {
    email: string;
    password: string;
    username: string;
  }): Promise<{ token: string; user: UserDTO }>;
}
