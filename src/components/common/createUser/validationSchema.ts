import * as yup from 'yup';

const ERROR_REQUIRED = 'Поле обов’язкове';

export const validationUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Повинна бути дійсна електронна адреса')
    .required(ERROR_REQUIRED),
  full_name: yup
    .string()
    .min(10, 'Має бути більше 10 символів')
    .required(ERROR_REQUIRED),

  date_of_birth: yup.date().required(ERROR_REQUIRED),

  series_passport: yup.string().length(2, 'Має бути 2 символи '),
  date_of_issue_of_passport: yup.date().required(ERROR_REQUIRED),

  id_authority_that_issued_the_passport: yup.array().required(ERROR_REQUIRED),
  ITN: yup.string().required(ERROR_REQUIRED),

  id_organizations: yup.array().required(ERROR_REQUIRED),

  id_position: yup.array().required(ERROR_REQUIRED),

  region: yup.string().required(ERROR_REQUIRED),

  city: yup.string().required(ERROR_REQUIRED),

  street: yup.string().required(ERROR_REQUIRED),

  house_number: yup.number().required(ERROR_REQUIRED).integer(),

  flat_number: yup.number().integer().nullable(),
});
