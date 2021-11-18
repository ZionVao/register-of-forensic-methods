export interface MethodCreateDTO {
  registration_code: string;
  name: string;

  id_domaims: number;
  id_types: number;

  year_creation: number;
  year_making_changes: number | null;
  year_termination_application: number | null;

  date_of_decision_on_state_registration: Date;
  date_of_decision_on_state_registration_of_changes: Date | null;
  date_of_decision_to_terminate_the_application: Date | null;

  doc_copy_of_method: string;
  doc_report_review: string;

  doc_certificate_of_approbation: string;
  doc_copy_of_implementation: string;

  doc_discount_card: string;
}
