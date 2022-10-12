export interface ChatComment {
  id: number;
  createdAt: number | Date;
  username: string;
  displayName: string;
  image: string;
  body: string;
}