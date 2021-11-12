import { UserDTO } from '../../common/dtos/user/UserDTO';
import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { IAuthService } from './IAuthServise';
import { UserMapper } from './UserMapper';

class Auth implements IAuthService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserDTO }> {
    const res = await this._http.load('/api/auth/login', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload),
    });
    return { token: res.token, user: UserMapper.toDTO(res.user) };
  }

  async registration(payload: {
    email: string;
    password: string;
    username: string;
  }): Promise<{ token: string; user: UserDTO }> {
    const res = await this._http.load('/api/auth/register', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload),
    });
    return { token: res.token, user: UserMapper.toDTO(res.user) };
  }
}

export { Auth };
