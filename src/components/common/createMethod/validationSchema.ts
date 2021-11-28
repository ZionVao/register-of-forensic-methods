import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nameV: yup.string().required('Name Validation Field is Required'),
  selV: yup.string().required('Select Validation Field is Required'),
  selAutoV: yup.array().required('Multi Select Validation Field required'),
  txtDateV: yup
    .date()
    .typeError('Mui Date field must be a date')
    .required('Mui Date field is required'),
});
