import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from "react-toastify";
import { history } from "../../index";
import { store } from "app/stores/store";
import { PaginatedResult } from "types/pagination.types";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env['REACT_APP_API_URL'];

axios.interceptors.request.use((config: any) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === 'development') await sleep(1000);
  
  const pagination = response.headers['pagination'];
  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    return response as AxiosResponse<PaginatedResult<any>>;
  }
  return response;
}, (error: AxiosError) => {
  const { data, status, config }: any = error.response!;
  switch (status) {
    case 400:
      if (typeof data === 'string') {
        toast.error(data);
      }
      if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/not-found');
      }
      if (data.errors) {
        const modalStateErrors = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErrors.push(data.errors[key]);
          }
        }
        throw modalStateErrors.flat();
      }
      break;
    case 401:
      toast.error('unauthorised');
      break;
    case 404:
      history.push('/not-found');
      toast.error('not found');
      break;
    case 500:
      store.commonStore.setServerError(data);
      history.push('/server-error');
      break;
  }
  return Promise.reject(error);
});

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};