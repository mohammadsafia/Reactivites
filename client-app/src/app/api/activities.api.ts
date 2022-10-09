import { requests } from "app/api/requests";
import { Activity } from "types/activity.types";

const baseURL = '/activities';

export const ActivitiesApi = {
  list: () => requests.get<Activity[]>(baseURL),
  details: (id: string) => requests.get<Activity>(`${baseURL}/${id}`),
  create: (activity: Activity) => requests.post<void>(baseURL, activity),
  update: (activity: Activity) => requests.put<void>(`${baseURL}/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`${baseURL}/${id}`)
};
