import { Options } from '../interfaces/interfaces';

export interface IHttpService {
  load(url: string, options: Options): Promise<any>;
}
