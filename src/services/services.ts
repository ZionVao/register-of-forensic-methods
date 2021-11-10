import { Auth } from './auth/auth.service';
import { Http } from './http/http.service';
import { MetodService } from './metod/metod.service';
import { StorageService } from './storage/storage.service';

const storage = new StorageService(localStorage);

const http = new Http(storage);

const auth = new Auth(http);

const metodService = new MetodService(http);

export { http, storage, auth, metodService };
