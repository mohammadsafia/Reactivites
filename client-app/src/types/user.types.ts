export type User = {
  displayName: string;
  image?: string;
  token: string;
  username: string;
}

export type UserFormValues = {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
