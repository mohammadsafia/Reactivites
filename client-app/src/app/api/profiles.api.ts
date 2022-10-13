import { requests } from "app/api/requests";
import { Photo, Predicate, Profile } from "types";
import axios from "axios";

export const ProfilesApi = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  
  uploadPhoto: (file: Blob) => {
    let formDate = new FormData();
    formDate.append('File', file);
    return axios.post<Photo>('photos', formDate, {
      headers: { 'Content-type': 'multipart/form-data' }
    });
  },
  
  setMainPhoto: (id: string) => requests.post<void>(`/photos/${id}/setMain`, {}),
  
  deletePhoto: (id: string) => requests.delete<void>(`/photos/${id}`),
  
  updateProfile: (profile: Partial<Profile>) => requests.put<void>('/profiles', profile),
  
  updateFollowing: (username: string) => requests.post<void>(`/follow/${username}`, {}),
  
  listFollowings: (username: string, predicate: Predicate) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`)
};