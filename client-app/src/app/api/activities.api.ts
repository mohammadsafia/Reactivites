import { requests } from "app/api/requests";
import { Activity, ActivityFormValues } from "types/activity.types";

const baseURL = '/activities';

export const ActivitiesApi = {
  list: () => requests.get<Activity[]>(baseURL),
  details: (id: string) => requests.get<Activity>(`${baseURL}/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>(baseURL, activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`${baseURL}/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`${baseURL}/${id}`),
  attend: (activityId: string)=> requests.post<void>(`${baseURL}/${activityId}/attend`, {})
};
