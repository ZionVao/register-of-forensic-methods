import { TransactionDTO } from '../../common/dtos/transaction/TransactionDTO';
import { UserMapper } from '../user/UserMapper';

export class TransactionMapper {
  public static toDTO(value: { [x: string | number]: any }): TransactionDTO {
    return {
      id: value.id,
      datetime: value.datetime,
      id_method: value.id_method,
      id_old_value: value.id_old_value || null,
      id_type: value.id_type,
      id_user: value.id_user,
      methodslogs:
        value.methodslogs === null
          ? null
          : {
              id: value.methodslogs.id,
              registration_code: value.methodslogs.registration_code,
              name: value.methodslogs.name,

              id_domains: value.methodslogs.id_domains,

              author: value.methodslogs.author,

              year_creation: value.methodslogs.year_creation,
              year_making_changes:
                value.methodslogs.year_making_changes || null,
              year_termination_application:
                value.methodslogs.year_termination_application || null,

              date_of_decision_on_state_registration:
                value.methodslogs.date_of_decision_on_state_registration,
              date_of_decision_on_state_registration_of_changes:
                value.methodslogs
                  .date_of_decision_on_state_registration_of_changes || null,
              date_of_decision_to_terminate_the_application:
                value.methodslogs
                  .date_of_decision_to_terminate_the_application || null,

              doc_copy_of_method: value.methodslogs.doc_copy_of_method,
              doc_report_review: value.methodslogs.doc_report_review,
              doc_certificate_of_approbation:
                value.methodslogs.doc_certificate_of_approbation,
              doc_copy_of_implementation:
                value.methodslogs.doc_copy_of_implementation,
              doc_discount_card: value.methodslogs.doc_discount_card,
            },
      typeAction: { id: value.typeAction.id, name: value.typeAction.name },
      users: UserMapper.toDTO(value.users),
    };
  }
}
