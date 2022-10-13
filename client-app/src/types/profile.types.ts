import { User } from "types";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[]
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export type Predicate = 'followings' | 'followers'