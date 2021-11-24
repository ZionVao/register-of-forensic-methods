export interface IMethodCreate {
  registration_code: string;
  name: string;
  id_domains: number | null;

  year_creation: Date | null;
  year_making_changes: Date | null;
  year_termination_application: Date | null;

  date_of_decision_on_state_registration: Date | null;
  date_of_decision_on_state_registration_of_changes: Date | null;
  date_of_decision_to_terminate_the_application: Date | null;

  author: string;
}

export interface IMethodCheck {
  registration_code: boolean;
  name: boolean;
  author: boolean;

  id_domains: boolean;

  year_creation: boolean;
  year_making_changes: boolean;
  year_termination_application: boolean;

  date_of_decision_on_state_registration: boolean;
  date_of_decision_on_state_registration_of_changes: boolean;
  date_of_decision_to_terminate_the_application: boolean;
}

export const initialMethodCheckValid: IMethodCheck = {
  registration_code: true,
  name: true,
  author: true,

  id_domains: true,

  year_creation: true,
  year_making_changes: true,
  year_termination_application: true,

  date_of_decision_on_state_registration: true,
  date_of_decision_on_state_registration_of_changes: true,
  date_of_decision_to_terminate_the_application: true,
};

export const initialState: IMethodCreate = {
  registration_code: '',
  name: '',
  author: '',
  id_domains: null,

  year_creation: null,
  year_making_changes: null,
  year_termination_application: null,

  date_of_decision_on_state_registration: null,
  date_of_decision_on_state_registration_of_changes: null,
  date_of_decision_to_terminate_the_application: null,
};

export interface IDoc {
  doc_copy_of_method: File | null;
  doc_report_review: File | null;

  doc_certificate_of_approbation: File | null;
  doc_copy_of_implementation: File | null;

  doc_discount_card: File | null;
}

export const initialDocsState: IDoc = {
  doc_copy_of_method: null,
  doc_report_review: null,

  doc_certificate_of_approbation: null,
  doc_copy_of_implementation: null,

  doc_discount_card: null,
};
