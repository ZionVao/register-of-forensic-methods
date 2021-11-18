import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { HttpMethod } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { Filter } from '../interfaces/interfaces';
import { ITransactionService } from './ITransactionService';
import { TransactionMapper } from './TransactionMapper';

export class TransactionService implements ITransactionService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }

  async getTransactions(filter: Filter): Promise<TransactionDTO[]> {
    const transactions = await this._http.load('/main/method', {
      method: HttpMethod.GET,
      query: { ...filter },
      hasAuth: Boolean(filter.userId),
    });
    return transactions.map(TransactionMapper.toDTO);
  }
}
