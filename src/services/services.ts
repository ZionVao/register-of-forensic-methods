import { Http } from './http/http.service';
import { MethodService } from './method/method.service';
import { StorageService } from './storage/storage.service';
import { TransactionService } from './transaction/transaction.service';
import { TypeService } from './type/type.service';
import { UserService } from './user/user.service';

const storage = new StorageService(localStorage);

const http = new Http(storage);

const userService = new UserService(http);

const transactionService = new TransactionService(http);

const typeService = new TypeService(http);

const methodService = new MethodService(http);

export {
  http,
  storage,
  userService,
  transactionService,
  methodService,
  typeService,
};
