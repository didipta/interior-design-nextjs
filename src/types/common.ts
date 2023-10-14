export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type Inputs = {
  categoryname: string;
};

export type IDProps = {
  params: any;
};

export type IService = {
  id: string;
  name: string;
  img: string;
  price: number;
  Available: number;
  slug: string;
  description: string;
  shortdescription: string;
  servicecategoryId: string;
};
