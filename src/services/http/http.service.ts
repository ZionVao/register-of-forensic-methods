import { HttpError } from '../../exceptions/exceptions';
import { getStringifiedQuery } from '../../helpers/helpers';
import { StorageKey, HttpHeader, HttpMethod } from '../../common/enum/enums';
import { StorageService } from '../storage/storage.service';
import { Options, Query } from '../interfaces/interfaces';
import { IHttpService } from './IHttpServise';
import { config } from 'dotenv';

config();

class Http implements IHttpService {
  private _storage: StorageService;

  constructor(storage: StorageService) {
    this._storage = storage;
  }

  async load(url: string, options: Options = {}): Promise<any> {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = false,
      contentType,
      query,
    } = options;
    const headers = this._getHeaders(hasAuth, contentType);

    const request = new Request(this._getUrl(url, query), {
      method: method,
      headers: headers,
      body: payload,
    });
    console.log('1');

    const a = await fetch(request);
    // this._checkStatus(a);
    const b = await a.json();

    console.log(b);

    return b;

    // return this._parseJSON(a);
    // .then(this._checkStatus)
    // .then(this._parseJSON)
    // .catch(this._throwError);
  }

  private _getHeaders(hasAuth: boolean, contentType?: string): Headers {
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
    console.log('in check status', response);

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

  private _getUrl(url: string, query?: Query) {
    console.log(url, query);

    const api = process.env.REACT_APP_HOST_API;

    return `${api}${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
  }

  private async _parseJSON(response: Response): Promise<any> {
    console.log('in parse', response);
    return response.json();
  }

  private _throwError(err: Error) {
    console.log('err', err);

    throw err;
  }
}

export { Http };
