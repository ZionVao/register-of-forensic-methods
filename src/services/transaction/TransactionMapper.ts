import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';

export class TransactionMapper {
  public static toDTO(value: { [x: string | number]: any }): TransactionDTO {
    return { id: 1 };
  }
}
