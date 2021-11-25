import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { MethodCreateDTO } from '../../common/dtos/method/MethodCreateDTO';
import { MethodDTO } from '../../common/dtos/method/MethodDTO';
import { MethodUpdateDTO } from '../../common/dtos/method/MethodUpdateDTO';
import { IMethodService } from './IMethodServise';
import { MethodMapper } from './MethodMapper';
import { MethodFilter } from '../interfaces/interfaces';

class MethodService implements IMethodService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async getAllMethods(
    filter: MethodFilter,
  ): Promise<{ methods: MethodDTO[]; count: number }> {
    const methods = await this._http.load('/main/method', {
      method: HttpMethod.GET,
      query: { ...filter, ids: filter.ids ? filter.ids.join(', ') : undefined },
    });
    return {
      methods: methods.methods.map(MethodMapper.toDTO),
      count: methods.count,
    };
  }

  async getMethod(id: number): Promise<MethodDTO> {
    const metod = await this._http.load(`/main/method/${id}`, {
      method: HttpMethod.GET,
    });
    return MethodMapper.toDTO(metod);
  }

  async addMethod(payload: FormData): Promise<{ id: number }> {
    return this._http.load('/main/method', {
      method: HttpMethod.POST,
      contentType: ContentType.MULTIPART,
      form: payload,
      hasAuth: true,
    });
  }

  async updateMetod(id: number, method: FormData): Promise<{ id: number }> {
    return this._http.load(`/main/method/${id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.MULTIPART,
      payload: JSON.stringify(method),
      hasAuth: true,
    });
  }
}

export { MethodService };
