import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { IAuthService } from './IAuthServise';

class Auth implements IAuthService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  login(payload: { email: string; password: string }) {
    return this._http.load('/api/auth/login', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload),
    });
  }

  registration(payload: { email: string; password: string; username: string }) {
    return this._http.load('/api/auth/register', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: false,
      payload: JSON.stringify(payload),
    });
  }

  getCurrentUser() {
    return this._http.load('/api/auth/user', {
      method: HttpMethod.GET,
    });
  }
}

export { Auth };
