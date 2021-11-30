import * as yup from 'yup';

const ERROR_REQUIRED = 'Поле обов’язкове';
const WRONG_FORMAT = 'Неправильний формат';

export const validationSchema = yup.object().shape({
  registration_code: yup
    .string()
    .matches(/^[0-9]+[.][0-9]+[.][0-9]+$/, {
      message: WRONG_FORMAT,
      excludeEmptyString: true,
    })
    .required(ERROR_REQUIRED),

  name: yup.string().required(ERROR_REQUIRED),

  id_domains: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
        id_types: yup.number(),
      }),
    )
    .nullable()
    .length(1, ERROR_REQUIRED),

  year_creation: yup.date().required(ERROR_REQUIRED).typeError(WRONG_FORMAT),

  year_making_changes: yup
    .date()
    .when('year_creation', {
      is: (year_creation: any) => {
        return yup.date().isValid(year_creation);
      },
      then: yup
        .date()
        .min(
          yup.ref('year_creation'),
          'Дата не може бути меншою за дату створення',
        )
        .nullable()
        .notRequired()
        .typeError(WRONG_FORMAT),
      otherwise: yup.date().nullable().notRequired().typeError(WRONG_FORMAT),
    })
    .nullable()
    .notRequired()
    .typeError(WRONG_FORMAT),

  year_termination_application: yup
    .date()
    .when('year_creation', {
      is: (year_creation: any) => {
        return yup.date().isValid(year_creation);
      },
      then: yup
        .date()
        .min(
          yup.ref('year_creation'),
          'Дата не може бути меншою за дату створення',
        )
        .nullable()
        .notRequired()
        .typeError(WRONG_FORMAT),
      otherwise: yup.date().nullable().notRequired().typeError(WRONG_FORMAT),
    })
    .nullable()
    .notRequired()
    .typeError(WRONG_FORMAT),

  date_of_decision_on_state_registration: yup
    .date()
    .required(ERROR_REQUIRED)
    .typeError(WRONG_FORMAT),

  date_of_decision_on_state_registration_of_changes: yup
    .date()
    .when('date_of_decision_on_state_registration', {
      is: (date_of_decision_on_state_registration: any) => {
        return yup.date().isValid(date_of_decision_on_state_registration);
      },
      then: yup
        .date()
        .min(
          yup.ref('date_of_decision_on_state_registration'),
          'Дата не може бути меншою за дату реєстрації',
        )
        .nullable()
        .notRequired()
        .typeError(WRONG_FORMAT),
      otherwise: yup.date().nullable().notRequired().typeError(WRONG_FORMAT),
    })
    .nullable()
    .notRequired()
    .typeError(WRONG_FORMAT),

  date_of_decision_to_terminate_the_application: yup
    .date()
    .when('date_of_decision_on_state_registration', {
      is: (date_of_decision_on_state_registration: any) => {
        return yup.date().isValid(date_of_decision_on_state_registration);
      },
      then: yup
        .date()
        .min(
          yup.ref('date_of_decision_on_state_registration'),
          'Дата не може бути меншою за дату реєстрації',
        )
        .nullable()
        .notRequired()
        .typeError(WRONG_FORMAT),
      otherwise: yup.date().nullable().notRequired().typeError(WRONG_FORMAT),
    })
    .nullable()
    .notRequired()
    .typeError(WRONG_FORMAT),

  doc_copy_of_method: yup.mixed().required(ERROR_REQUIRED),
  doc_report_review: yup.mixed().required(ERROR_REQUIRED),

  doc_certificate_of_approbation: yup.mixed().required(ERROR_REQUIRED),
  doc_copy_of_implementation: yup.mixed().required(ERROR_REQUIRED),

  doc_discount_card: yup.mixed().required(ERROR_REQUIRED),

  author: yup.string().required(ERROR_REQUIRED),
});
