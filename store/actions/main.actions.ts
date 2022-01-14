import { User } from "firebase/auth";
import { MainActionType, SetUserAction } from "../types/main.types";

export function setUser(user: User | null): SetUserAction {
  return {
    type: MainActionType.SET_USER,
    payload: user
  }
}