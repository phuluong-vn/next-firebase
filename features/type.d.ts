export interface IDocDb {
  id: string;
  deleted_at:  {
    seconds: number;
    nanoseconds: number;
  };
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  updated_at: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface IPaginationRes<T> {
  meta: {
    total: number;
  };
  data: Array<T>;
}


export interface IGetDataInput {
  keyword: string;
  page: number;
  orderField: string;
  orderType: 'asc' | 'desc';
  size?: number;
}