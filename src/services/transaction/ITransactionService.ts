import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { Filter } from '../interfaces/interfaces';

export interface ITransactionService {
  getTransactions(filter: Filter): Promise<TransactionDTO[]>;
}
