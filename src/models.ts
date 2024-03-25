export type User = {
  username: string;
  color: string;
  id: number;
};

export type MessageData = {
  user: User;
  message: string;
  type: MessageType;
};

export enum MessageType {
  JOINED = "USER_JOINED",
  LEFT = "USER_LEFT",
  MESSAGE = "USER_MESSAGE",
}
