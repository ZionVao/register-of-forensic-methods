import * as yup from 'yup';

const ERROR_REQUIRED = 'Поле обов’язкове';
const WRONG_FORMAT = 'Неправильний формат';

export const validationUserSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_REQUIRED)
    .email('Повинна бути дійсна електронна адреса'),

  full_name: yup
    .string()
    .required(ERROR_REQUIRED)
    .min(6, 'Має бути більше 6 символів')
    .max(30),

  date_of_birth: yup
    .date()
    .required(ERROR_REQUIRED)
    .max(new Date(), WRONG_FORMAT),

  series_passport: yup
    .string()
    .length(2, 'Має бути 2 символи')
    .matches(/^[А-Я]{2}$/, WRONG_FORMAT),

  date_of_issue_of_passport: yup
    .date()
    .required(ERROR_REQUIRED)
    .when(
      'date_of_birth',
      (date_of_birth, yup) =>
        date_of_birth &&
        yup.min(
          new Date(date_of_birth),
          'Дата видачі паспорта не може бути меншою за дату народження',
        ),
    )
    .when(
      'date_of_birth',
      (date_of_birth, yup) =>
        date_of_birth &&
        yup.max(
          new Date(
            new Date(date_of_birth).getFullYear() + 18,
            new Date(date_of_birth).getMonth(),
            new Date(date_of_birth).getDate(),
          ),
          'Дата видачі паспорта не може бути більшою 18 років після народження',
        ),
    ),

  id_authority_that_issued_the_passport: yup
    .array()
    // .required(ERROR_REQUIRED)
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .length(1, ERROR_REQUIRED),

  ITN: yup
    .string()
    .required(ERROR_REQUIRED)
    .matches(/^[0-9]{10}$/, 'Має бути 10 цифр'),

  id_organizations: yup
    .array()
    // .required(ERROR_REQUIRED)
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .length(1, ERROR_REQUIRED),

  id_position: yup
    .array()
    // .required(ERROR_REQUIRED)
    .of(
      yup.object().shape({
        name: yup.string(),
        id: yup.number(),
      }),
    )
    .length(1, ERROR_REQUIRED),

  region: yup.string().required(ERROR_REQUIRED),

  city: yup.string().required(ERROR_REQUIRED),

  street: yup.string().required(ERROR_REQUIRED),

  house_number: yup.string().required(ERROR_REQUIRED),

  flat_number: yup.number().integer().nullable(),
});
