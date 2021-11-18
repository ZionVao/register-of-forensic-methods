export interface Query {
  [x: string]: string | number | undefined;
}

interface Body {
  [x: string]: any;
}

export interface Options {
  method?: string;
  // body?: Body;
  contentType?: string;
  hasAuth?: boolean;
  payload?: string;
  query?: Query;
}

export interface Filter {
  userId: number | undefined;
  page: number;
  count: number;
}
