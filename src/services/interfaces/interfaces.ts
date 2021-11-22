export interface Query {
  [x: string]: string | Date | number | undefined;
}

interface Body {
  [x: string]: any;
}

export interface Options {
  method?: string;
  contentType?: string;
  hasAuth?: boolean;
  payload?: string;
  query?: Query;
}

// export interface Filter {
//   userId?: number;
//   page: number;
//   count: number;
// }

export interface MethodFilter {
  ids?: number[];
  name?: string;
  code?: string;
  page: number;
  count: number;
}

export interface UserFilter {
  page: number;
  count: number;
}

export interface TransactionFilter {
  full_name?: string;
  email?: string;
  code?: string;
  date1?: Date;
  date2?: Date;
  id_typeAction?: number;
  page: number;
  count: number;
}

export interface LoginBody {
  email: string;
  password: string;
}
