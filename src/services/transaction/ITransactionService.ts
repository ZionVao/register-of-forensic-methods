import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { TransactionFilter } from '../interfaces/interfaces';

export interface ITransactionService {
  getTransactions(
    filter: TransactionFilter,
  ): Promise<{ logs: TransactionDTO[]; count: number }>;
  deleteTransaction(id: number): Promise<{ id: number }>;
  getActions(): Promise<{ id: number; name: string }[]>;
}
