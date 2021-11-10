import { Query } from '../../../services/interfaces/interfaces';

const getStringifiedQuery = (params: Query) =>
  Object.keys(params)
    .map((key) => key + '=' + (params[key] ? String(params[key]) : ''))
    .join('&');

export { getStringifiedQuery };
