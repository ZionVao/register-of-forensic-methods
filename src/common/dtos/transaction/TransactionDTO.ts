import { MethodDTO } from '../method/MethodDTO';
import { TypeActionDTO } from '../type-action/TypeActionDTO';
import { UserDTO } from '../user/UserDTO';

export interface TransactionDTO {
  datetime: string;
  id: number;
  id_method: number;
  id_old_value: number | null;
  id_type: number;
  id_user: number;

  methodslogs: {
    author: number;
    date_of_decision_on_state_registration: string;
    date_of_decision_on_state_registration_of_changes: string | null;
    date_of_decision_to_terminate_the_application: string | null;
    doc_certificate_of_approbation: string;
    doc_copy_of_implementation: string;
    doc_copy_of_method: string;
    doc_discount_card: string;
    doc_report_review: string;
    id: number;
    id_domains: number;
    name: string;
    registration_code: string;
    year_creation: number;
    year_making_changes: number | null;
    year_termination_application: number | null;
  } | null;
  typeAction: TypeActionDTO;
  users: UserDTO;
}
