import { User } from "firebase/auth";

export interface MainState {
  user: User | null
}

export enum MainActionType {
  SET_USER = "main/set_user"
}

export interface SetUserAction {
  type: MainActionType.SET_USER
  payload: User | null
}

export type MainAction = 
  | SetUserAction