"use client";

import { createClient } from "@/supabase/client";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  user: User | null;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  user: null,
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const supabase = createClient();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === "INITIAL_SESSION") {
          // 초기 세션 상태를 처리
          setUser(session?.user || null);
        } else if (event === "SIGNED_IN") {
          // 사용자가 로그인했을 때 처리
          setUser(session!.user);
        } else if (event === "SIGNED_OUT") {
          // 사용자가 로그아웃했을때
          setUser(null);
        } else if (event === "PASSWORD_RECOVERY") {
          // 비밀번호 복구 이벤트
        } else if (event === "TOKEN_REFRESHED") {
          // 토큰이 갱신되었을 때 처리
        } else if (event === "USER_UPDATED") {
          // 사용자가 업데이트 되었을 때 처리
          setUser(session!.user);
        }

        setIsInitialized(true);
      }
    );
  }, []);

  const value = { isInitialized, isLoggedIn, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
