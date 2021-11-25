import { HttpError } from '../../exceptions/exceptions';
import { getStringifiedQuery } from '../../helpers/helpers';
import {
  StorageKey,
  HttpHeader,
  HttpMethod,
  ContentType,
} from '../../common/enum/enums';
import { StorageService } from '../storage/storage.service';
import { Options, Query } from '../interfaces/interfaces';
import { IHttpService } from './IHttpServise';
import { config } from 'dotenv';
import axios from 'axios';
import { Method } from '@testing-library/react';

config();

type HMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT';

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
      form = null,
    } = options;

    const headers = this._getHeaders(hasAuth, contentType);

    if (contentType === ContentType.MULTIPART) {
      console.log(form, 'form');

      const token = this._storage.getItem(StorageKey.TOKEN);
      if (method === HttpMethod.PUT) {
        const a = await axios({
          method: 'put',
          data: form,
          url: this._getUrl(url, query),
          headers: {
            'Content-Type': ContentType.MULTIPART,
            Authorization: `Bearer ${token}`,
          },
        });
        return a;
      }
      if (method === HttpMethod.POST) {
        const a = await axios({
          method: 'post',
          data: form,
          url: this._getUrl(url, query),
          headers: {
            'Content-Type': ContentType.MULTIPART,
            Authorization: `Bearer ${token}`,
          },
        });
        return a;
      }

      // const request = new Request(this._getUrl(url, query), {
      //   method: method,
      //   headers: headers,
      //   body: form,
      // });

      // // request.post("http://127.0.0.1:8080/add_foo", data={'foo': 'foobar'})

      // console.log('221345t6y4321', request.body);
      // const a = await fetch(request);
      // this._checkStatus(a);
      // console.log(a.body);

      // const b = await a.json();

      // console.log(a);
    } else {
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
    }

    // return this._parseJSON(a);
    // .then(this._checkStatus)
    // .then(this._parseJSON)
    // .catch(this._throwError);
  }

  private _getHeaders(hasAuth: boolean, contentType?: string): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
      // headers.append(
      //   HttpHeader.CONTENT_TYPE,
      //   'multipart/form-data; boundary=AaB03x;  charset=utf-8',
      // );
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
