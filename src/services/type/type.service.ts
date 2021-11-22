import { TypeDTO } from '../../common/dtos/type/TypeDTO';
import { ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { ITypeService } from './ITypeService';
import { TypeMapper } from './TypeMapper';

export class TypeService implements ITypeService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }
  async getTypeById(id: number): Promise<TypeDTO> {
    const type = await this._http.load(`/main/method/type/${id}`, {
      contentType: ContentType.JSON,
    });
    return TypeMapper.toDTO(type);
  }
  async getAllTypes(): Promise<TypeDTO[]> {
    const types = await this._http.load('/main/method/type', {
      contentType: ContentType.JSON,
    });

    return types.map(TypeMapper.toDTO);
  }
}
