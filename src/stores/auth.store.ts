import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserStoreProps = {
  user: User;
  putEmail: (value: string) => void;
  putPassword: (value: string) => void;
  putNickname: (value: string) => void;
  putUser: (value: User) => void;
};

export type User = {
  id: string;
  email: string;
  password?: string;
  nickname: string;
};
export const useAuthStore = create<UserStoreProps>()(
  immer((set) => ({
    user: {
      id: "",
      email: "",
      password: "",
      nickname: "",
    },
    putEmail: (newEmail) => {
      set((prevUser) => {
        prevUser.user.email = newEmail;
      });
    },
    putPassword: (newPassword) => {
      set((prevUser) => {
        prevUser.user.password = newPassword;
      });
    },
    putNickname: (newNick) => {
      set((prevUser) => {
        prevUser.user.nickname = newNick;
      });
    },
    putUser: (newUser) => {
      set((prevUser) => {
        prevUser.user = newUser;
      });
    },
  }))
);
