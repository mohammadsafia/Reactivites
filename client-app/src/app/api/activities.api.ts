import { requests, responseBody } from "app/api/requests";
import { Activity, ActivityFormValues, PaginatedResult } from "types";
import axios from "axios";

const baseURL = '/activities';

export const ActivitiesApi = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Activity[]>>(baseURL, { params }).then(responseBody),
  details: (id: string) => requests.get<Activity>(`${baseURL}/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>(baseURL, activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`${baseURL}/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`${baseURL}/${id}`),
  attend: (activityId: string) => requests.post<void>(`${baseURL}/${activityId}/attend`, {})
};
