import { UserCreateDTO } from '../../common/dtos/user/UserCreateDTO';
import { UserDTO } from '../../common/dtos/user/UserDTO';

export interface IAuthService {
  login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserDTO | null }>;
  registration(
    payload: UserCreateDTO,
  ): Promise<{ token: string; user: UserDTO }>;
}
