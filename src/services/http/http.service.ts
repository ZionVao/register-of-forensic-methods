import { HttpError } from '../../exceptions/exceptions';
import { getStringifiedQuery } from '../../helpers/helpers';
import { StorageKey, HttpHeader, HttpMethod } from '../../common/enum/enums';
import { StorageService } from '../storage/storage.service';
import { Options, Query } from '../interfaces/interfaces';
import { IHttpService } from './IHttpServise';

class Http implements IHttpService {
  private _storage: StorageService;

  constructor(storage: StorageService) {
    this._storage = storage;
  }

  async load(url: string, options: Options = {}): Promise<any> {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = true,
      contentType,
      query,
    } = options;
    const headers = this._getHeaders(hasAuth, contentType ? contentType : '');

    return fetch(this._getUrl(url, query), {
      method,
      headers,
      body: payload,
    })
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError);
  }

  private _getHeaders(hasAuth: boolean, contentType: string): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this._storage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async _checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }
    return response;
  }

  private _getUrl(url: string, query: Query | undefined) {
    return `${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
  }

  private _parseJSON(response: Response): Promise<any> {
    return response.json();
  }

  private _throwError(err: Error) {
    throw err;
  }
}

export { Http };
