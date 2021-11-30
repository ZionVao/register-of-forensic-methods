import * as yup from 'yup';

const WRONG_FORMAT = 'Неправильний формат';

export const validationSchema = yup.object().shape({
  registration_code: yup
    .string()
    .nullable()
    .matches(/^[0-9]+[.][0-9]+[.][0-9]+$/, WRONG_FORMAT),

  name: yup.string(),

  id_domains: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .nullable(),

  year_creation: yup.date(),
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

  date_of_decision_on_state_registration: yup.date(),
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

  author: yup.string(),
});
