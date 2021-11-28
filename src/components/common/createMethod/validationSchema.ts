import * as yup from 'yup';

const ERROR_REQUIRED = 'Поле обов’язкове';
const WRONG_FORMAT = 'Неправильний формат';

export const validationSchema = yup.object().shape({
  registration_code: yup
    .string()
    .required(ERROR_REQUIRED)
    .matches(/^[0-9]+[.][0-9]+[.][0-9]+$/, WRONG_FORMAT),

  name: yup.string().required(ERROR_REQUIRED),

  id_domains: yup.number().required(ERROR_REQUIRED),

  year_creation: yup.date().required(ERROR_REQUIRED),

  year_making_changes: yup
    .date()
    .nullable()
    .notRequired()
    .when(
      'year_creation',
      (year_creation, yup) =>
        year_creation &&
        yup.min(year_creation, 'Дата не може бути меншою за дату створення'),
    ),

  year_termination_application: yup
    .date()
    .nullable()
    .notRequired()
    .when(
      'year_creation',
      (year_creation, yup) =>
        year_creation &&
        yup.min(year_creation, 'Дата не може бути меншою за дату створення'),
    ),

  date_of_decision_on_state_registration: yup.date().required(ERROR_REQUIRED),
  date_of_decision_on_state_registration_of_changes: yup
    .date()
    .nullable()
    .notRequired()
    .when(
      'date_of_decision_on_state_registration',
      (date_of_decision_on_state_registration, yup) =>
        date_of_decision_on_state_registration &&
        yup.min(
          new Date(date_of_decision_on_state_registration),
          'Дата не може бути меншою за дату реєстрації',
        ),
    ),

  date_of_decision_to_terminate_the_application: yup
    .date()
    .nullable()
    .notRequired()
    .when(
      'date_of_decision_on_state_registration',
      (date_of_decision_on_state_registration, yup) =>
        date_of_decision_on_state_registration &&
        yup.min(
          new Date(date_of_decision_on_state_registration),
          'Дата не може бути меншою за дату реєстрації',
        ),
    ),

  doc_copy_of_method: yup.mixed().required(ERROR_REQUIRED),
  doc_report_review: yup.mixed().required(ERROR_REQUIRED),

  doc_certificate_of_approbation: yup.mixed().required(ERROR_REQUIRED),
  doc_copy_of_implementation: yup.mixed().required(ERROR_REQUIRED),

  doc_discount_card: yup.mixed().required(ERROR_REQUIRED),

  author: yup.string().required(ERROR_REQUIRED),
});
