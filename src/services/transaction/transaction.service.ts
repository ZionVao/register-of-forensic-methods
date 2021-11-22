import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { HttpMethod, ContentType } from '../../common/enum/enums';
import { IHttpService } from '../http/IHttpServise';
import { TransactionFilter } from '../interfaces/interfaces';
import { ITransactionService } from './ITransactionService';
import { TransactionMapper } from './TransactionMapper';

export class TransactionService implements ITransactionService {
  private _http: IHttpService;
  constructor(http: IHttpService) {
    this._http = http;
  }
  async getActions(): Promise<{ id: number; name: string }[]> {
    const actions = await this._http.load('/main/actions', {
      contentType: ContentType.JSON,
    });
    return actions.map((e: { [x: string]: number | string }) => ({
      id: e.id,
      name: e.name,
    }));
  }
  async deleteTransaction(id: number): Promise<{ id: number }> {
    return this._http.load(`/main/log/${id}`, {
      method: HttpMethod.DELETE,
      contentType: ContentType.JSON,
      hasAuth: true,
    });
  }

  async getTransactions(
    filter: TransactionFilter,
  ): Promise<{ logs: TransactionDTO[]; count: number }> {
    const transactions = await this._http.load('/main/log', {
      contentType: ContentType.JSON,
      query: { ...filter },
      hasAuth: true,
    });

    return {
      logs: transactions.logs.map(TransactionMapper.toDTO),
      count: transactions.count,
    };
  }
}
