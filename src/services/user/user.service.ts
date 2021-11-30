import { AddressDTO } from '../../common/dtos/address/AddressDTO';
import { UserCreateDTO } from '../../common/dtos/user/UserCreateDTO';
import { UserDTO } from '../../common/dtos/user/UserDTO';
import { ContentType, HttpMethod, StorageKey } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { UserFilter } from '../interfaces/interfaces';
import { IUserService } from './IUserService';
import { UserMapper } from './UserMapper';

export class UserService implements IUserService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async __refreshToken(): Promise<void> {
    try {
      const res = await this.token();
      console.log(res);
      localStorage.setItem(StorageKey.TOKEN, res.Token);
      if (localStorage.getItem(StorageKey.TOKEN)) {
        setTimeout(async () => {
          if (localStorage.getItem(StorageKey.REFRESH_TOKEN)) {
            await this.__refreshToken();
          }
        }, 60000);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }

  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ Token: string }> {
    const res = await this._http.load('/main/login', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
    // this.__refreshToken();
    return { Token: res.Token };
  }

  async token(): Promise<{ Token: string }> {
    const res = await this._http.load('/main/token', {
      contentType: ContentType.JSON,
      hasAuth: true,
    });
    return { Token: res.Token };
  }

  async getPositions(): Promise<{ id: number; name: string }[]> {
    const res = await this._http.load('/main/user/position', {
      contentType: ContentType.JSON,
    });
    return res.map((e: { [x: string]: string | number }) => ({
      id: e.id,
      name: e.name,
    }));
  }

  async getAddresses(): Promise<AddressDTO[]> {
    const res = await this._http.load('/main/addresses', {
      contentType: ContentType.JSON,
    });
    return res.map((e: { [x: string]: string | number }) => ({
      id: e.id,
      city: e.city,
      flat_number: e.flat_number || null,
      house_number: e.house_number,
      region: e.region,
      street: e.street,
    }));
  }

  async getAuthorities(): Promise<
    { id: number; code: number; id_adress: number; name: string }[]
  > {
    const res = await this._http.load('/main/authorities', {
      contentType: ContentType.JSON,
    });
    return res.map((e: { [x: string]: string | number }) => ({
      id: e.id,
      code: e.code,
      id_adress: e.id_adress,
      name: e.name,
    }));
  }

  async getOrganizations(): Promise<{ id: number; name: string }[]> {
    const res = await this._http.load('/main/organization', {
      contentType: ContentType.JSON,
    });
    return res.map((e: { [x: string]: string | number }) => ({
      id: e.id,
      name: e.name,
    }));
  }

  async getUsers(
    filter: UserFilter,
  ): Promise<{ users: UserDTO[]; count: number }> {
    const users = await this._http.load('/main/user', {
      hasAuth: true,
      contentType: ContentType.JSON,
      query: { ...filter },
    });
    return { users: users.users.map(UserMapper.toDTO), count: users.count };
  }

  async getUserByToken(): Promise<UserDTO> {
    const user = await this._http.load('/main/user/info', {
      hasAuth: true,
    });
    return UserMapper.toDTO(user);
  }

  async deleteUserById(id: number): Promise<{ id: number }> {
    const user = await this._http.load(`/main/user/${id}`, {
      method: HttpMethod.DELETE,
      hasAuth: true,
    });
    return { id: user.id };
  }

  async postUser(user: UserCreateDTO): Promise<{ id: number }> {
    const res = await this._http.load('/main/user', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: JSON.stringify(user),
    });
    return { id: res.id };
  }

  async getUserPosition(): Promise<{ id: number; name: string }[]> {
    const res = await this._http.load('/main/position', {
      contentType: ContentType.JSON,
    });
    return res.map((e: { [x: string]: string | number }) => ({
      id: e.id,
      name: e.name,
    }));
  }

  async sendDataUser(id: number): Promise<{ email: string }> {
    const res = await this._http.load('/main/user/send', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      hasAuth: true,
      payload: JSON.stringify({ id_user: id }),
    });
    return { email: res.email };
  }

  async activateUser(id: number): Promise<{ id_user: number }> {
    return this._http.load(`/main/user/activate/${id}`, {
      method: HttpMethod.PUT,
      hasAuth: true,
    });
  }

  async deactivateUser(id: number): Promise<{ id_user: number }> {
    return this._http.load(`/main/user/deactivate/${id}`, {
      method: HttpMethod.PUT,
      hasAuth: true,
    });
  }
}
