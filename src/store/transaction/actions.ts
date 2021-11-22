import { Dispatch } from '@reduxjs/toolkit';
import { TransactionFilter } from '../../services/interfaces/interfaces';
import { transactionService } from '../../services/services';
import { uiActions } from '../ui/slice';
import { transactionActions } from './slice';

export const fetchTransactionData =
  (filter: TransactionFilter) => (dispatch: Dispatch) => {
    transactionService
      .getTransactions(filter)
      .then((transactions) => {
        console.log('in ac store', transactions);

        dispatch(
          transactionActions.replaceTransaction({
            transactions: transactions.logs,
            totalCount: transactions.count,
            page: filter.page,
          }),
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching log data failed!',
          }),
        );
      });
  };
