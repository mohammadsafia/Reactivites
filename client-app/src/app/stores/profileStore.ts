import { Photo, Predicate, Profile, UserActivity } from "types";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "app/api/agent";
import { store } from "app/stores/store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings: Profile[] = [];
  loadingFollowings = false;
  userActivities: UserActivity[] = [];
  loadingActivities = false;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }
  
  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => this.profile = profile);
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => this.loadingProfile = false);
    }
  };
  
  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => this.uploading = false);
    }
  };
  
  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(f => f.isMain)!.isMain = false;
          this.profile.photos.find(f => f.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (e) {
      runInAction(() => this.loading = false);
      console.log(e);
    }
  };
  
  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(f => f.id !== photo.id);
          this.loading = false;
        }
      });
      
    } catch (e) {
      console.log(e);
      runInAction(() => this.loading = false);
    }
  };
  
  
  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (this.profile) {
          if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
            store.userStore.setDisplayName(profile.displayName);
          }
          this.profile = { ...this.profile, ...profile };
          this.loading = false;
        }
      });
    } catch (e) {
      runInAction(() => this.loading = false);
      console.log(e);
    }
  };
  
  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following ? this.profile.followerCount++ : this.profile.followerCount--;
          this.profile.following = !this.profile.following;
        }
        if(this.profile && this.profile.username === store.userStore.user?.username){
          following ? this.profile.followingCount++ : this.profile.followingCount--;
        }
        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following ? profile.followerCount-- : profile.followerCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => this.loading = false);
    }
  };
  
  loadFollowings = async (predicate: Predicate) => {
    this.loadingFollowings = true;
    try {
      const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => this.loadingFollowings = false);
    }
  };
  
  loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingActivities = true;
    try {
      const activities = await agent.Profiles.listActivities(username,
        predicate!);
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingActivities = false;
      })
    }
  }
}