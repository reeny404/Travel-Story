import { useAuthStore, User } from "@/stores/auth.store";
import { createClient } from "@/supabase/client";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const supabase = createClient();
  const { user, putUser } = useAuthStore();

  useEffect(() => {
    const checkUser = async () => {
      // 세션을 통해 로그인 한 유저가 있는지 확인
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (sessionError) {
        console.log("session을 불러오는 도중 에러 발생: ", sessionError);
      }

      if (!user) {
        console.log("로그인한 user 정보 없음");
        return false;
      }

      // 유저가 있을 시 data를 불러옴
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError) {
        return console.log("유저 정보를 불어오는 중에 오류 발생: ", userError);
      }

      // 유저의 정보를 zustand에 저장
      if (userData) {
        const currentUser: User = {
          id: user.id,
          email: userData.email ?? "",
          nickname: userData.nickname ?? "",
          imageUrl: userData.imageUrl ?? "",
          recent: [],
        };
        putUser(currentUser);
        return;
      }
    };
    checkUser();
  }, []);
  return <>{children}</>;
}

export default AuthProvider;
