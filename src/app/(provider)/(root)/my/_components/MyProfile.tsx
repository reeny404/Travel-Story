"use client";
import Profile from "@/components/Frame/Profile";
import { useAuth } from "@/contexts/auth.contexts";

type UserData = {
  kakao: UserInfo;
  email: UserInfo;
};

type UserInfo = {
  avatarUrl: string;
  nickname: string;
};

type Provider = "kakao" | "email";

function MyProfile() {
  const { user } = useAuth();

  const provider = user?.app_metadata.provider as Provider;
  const userData: UserData = {
    kakao: {
      avatarUrl: user?.user_metadata.avatar_url,
      nickname: user?.user_metadata.name,
    },
    email: {
      avatarUrl: "",
      nickname: user?.user_metadata.nickname,
    },
  };

  console.log(user);
  return (
    <section className="flex items-center mt-[21px] mb-[29px]">
      <Profile
        src={
          userData[provider].avatarUrl
            ? userData[provider].avatarUrl
            : "/icon/avatar.svg"
        }
        className="w-[60px] h-[60px]"
      />
      <div className="flex flex-col ml-[11px]">
        <h5>{userData[provider].nickname}</h5>
        <p className="text-[14px]">{user?.email}</p>
      </div>
      <button className="ml-auto">편집</button>
    </section>
  );
}

export default MyProfile;
