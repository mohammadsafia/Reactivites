import { requests } from "app/api/requests";
import { User, UserFormValues } from "types";

const baseURL = '/account';

export const AccountApi = {
  current: () => requests.get<User>(baseURL),
  login: (user: UserFormValues) => requests.post<User>(`${baseURL}/login`, user),
  register: (user: UserFormValues) => requests.post<User>(`${baseURL}/register`, user),
};