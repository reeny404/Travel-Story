import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type User = {
  user: {
    email: string;
    password: string;
    nickname: string;
  };
  putEmail: (value: string) => void;
  putPassword: (value: string) => void;
  putNickname: (value: string) => void;
};
export const useAuthStore = create<User>()(
  immer((set) => ({
    user: {
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
  }))
);
