import { Auth } from './auth/auth.service';
import { Http } from './http/http.service';
import { MethodService } from './method/method.service';
import { StorageService } from './storage/storage.service';

const storage = new StorageService(localStorage);

const http = new Http(storage);

const auth = new Auth(http);

const methodService = new MethodService(http);

export { http, storage, auth, methodService };
