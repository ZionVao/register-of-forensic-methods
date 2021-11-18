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
      hasAuth = false,
      contentType,
      query,
    } = options;
    const headers = this._getHeaders(hasAuth, contentType);

    // return [
    //   {
    //     id: 1,
    //     registration_code: '0.1.01',
    //     name: 'Методика комплексної експертизи та її використання при розслідуванні вбивств',

    //     author: 'Шиканов В.І.',

    //     id_domaims: 1,
    //     domainsOfMethod: {
    //       id: 1,
    //       name: '0.1. Комплексна експертиза',
    //       id_types: 1,
    //       typesOfMethods: {
    //         id: 1,
    //         name: '	0. Комплексна експертиза',
    //       },
    //     },

    //     year_creation: 1976,
    //     year_making_changes: null,
    //     year_termination_application: null,

    //     date_of_decision_on_state_registration: new Date('06-02-2009'),
    //     date_of_decision_on_state_registration_of_changes: null,
    //     date_of_decision_to_terminate_the_application: null,

    //     doc_copy_of_method: 'value.doc_copy_of_method',
    //     doc_report_review: 'value.doc_report_review',
    //     doc_certificate_of_approbation: 'value.doc_certificate_of_approbation',
    //     doc_copy_of_implementation: 'value.doc_copy_of_implementation',
    //     doc_discount_card: ' value.doc_discount_card',
    //   },
    // ];

    const request = new Request(this._getUrl(url, query), {
      method: method,
      headers: headers,
      body: payload,
    });
    console.log('1');

    return fetch(request)
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError);
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

    return `https://6a71-77-47-204-65.ngrok.io${url}${
      query ? `?${getStringifiedQuery(query)}` : ''
    }`;
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
