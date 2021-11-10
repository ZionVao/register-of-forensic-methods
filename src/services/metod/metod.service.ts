import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { MetodCreateDTO } from '../../common/dtos/metod/MetodCreateDTO';
import { MetodDTO } from '../../common/dtos/metod/MetodDTO';
import { MetodUpdateDTO } from '../../common/dtos/metod/MetodUpdateDTO';
import { IMetodService } from './IMetodServise';
import { MetodMapper } from './MetodMapper';

export interface Filter {
  userId: number | undefined;
  from: number;
  count: number;
}

class MetodService implements IMetodService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async getAllMethods(filter: Filter): Promise<MetodDTO[]> {
    const metods = await this._http.load('/api/posts', {
      method: HttpMethod.GET,
      query: { ...filter },
    });
    return metods.map(MetodMapper.toDTO);
  }

  async getMethod(id: number): Promise<MetodDTO> {
    const metod = await this._http.load(`/api/posts/${id}`, {
      method: HttpMethod.GET,
    });
    return MetodMapper.toDTO(metod);
  }

  async addMethod(payload: MetodCreateDTO): Promise<MetodDTO> {
    const metod = await this._http.load('/api/posts', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
    return MetodMapper.toDTO(metod);
  }

  async updateMetod(metod: MetodUpdateDTO): Promise<boolean> {
    return this._http.load('/api/posts/react', {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        metod,
      }),
    });
  }
}

export { MetodService };
