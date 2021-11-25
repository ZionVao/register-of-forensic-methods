export interface IUpdateMethod {
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
}

export const initialMethodCheckValid: IMethodCheck = {
  registration_code: true,
  name: true,
  author: true,
  id_domains: true,
};
export const initialState: IUpdateMethod = {
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
