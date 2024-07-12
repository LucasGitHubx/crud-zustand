export type UserID = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
  userID: UserID;
  userName: string;
  userlastName: string;
  userAge: number;
}
