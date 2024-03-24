export type User = {
  username: string;
  color: string;
  id: number;
};

export type MessageData = {
  user: User;
  message: string;
  type: UserType;
};

export enum UserType {
  JOINED = "USER_JOINED",
  LEFT = "USER_LEFT",
  MESSAGE = "USER_MESSAGE",
}
