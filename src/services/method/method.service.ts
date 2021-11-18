import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { MethodCreateDTO } from '../../common/dtos/method/MethodCreateDTO';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { MethodUpdateDTO } from '../../common/dtos/method/MethodUpdateDTO';
import { IMethodService } from './IMethodServise';
import { MetodMapper } from './MethodMapper';
import { Filter } from '../interfaces/interfaces';

class MethodService implements IMethodService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async getAllMethods(filter: Filter): Promise<MethodDTO[]> {
    const metods = await this._http.load('/main/method', {
      method: HttpMethod.GET,
      query: { ...filter },
      hasAuth: Boolean(filter.userId),
    });
    return metods.map(MetodMapper.toDTO);
  }

  async getMethod(id: number): Promise<MethodDTO> {
    const metod = await this._http.load(`/main/method/${id}`, {
      method: HttpMethod.GET,
      hasAuth: true,
    });
    return MetodMapper.toDTO(metod);
  }

  async addMethod(payload: MethodCreateDTO): Promise<MethodDTO> {
    const metod = await this._http.load('/main/method', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      hasAuth: true,
    });
    return MetodMapper.toDTO(metod);
  }

  async updateMetod(method: MethodUpdateDTO): Promise<boolean> {
    return this._http.load('/main/method', {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        method,
      }),
      hasAuth: true,
    });
  }
  async getTotallCount(): Promise<number> {
    return this._http.load('/main/method', {
      method: HttpMethod.GET,
    });
  }

  async deleteMethod(id: number): Promise<boolean> {
    return this._http.load(`/main/method/${id}`, {
      method: HttpMethod.DELELTE,
      hasAuth: true,
    });
  }
}

export { MethodService };
