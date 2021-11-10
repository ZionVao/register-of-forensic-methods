export interface Query {
  [x: string]: string | number | undefined;
}

export interface Options {
  method?: string;
  contentType?: string;
  hasAuth?: boolean;
  payload?: string;
  query?: Query;
}
