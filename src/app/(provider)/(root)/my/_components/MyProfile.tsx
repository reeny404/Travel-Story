"use client";
import Profile from "@/components/Frame/Profile";
import { useAuth } from "@/contexts/auth.contexts";

function MyProfile() {
  const { user } = useAuth();

  const profileUrl = user?.user_metadata.avatar_url ?? "";

  return (
    <section className="flex items-center mt-[21px] mb-[29px]">
      <Profile
        src={profileUrl ? profileUrl : "/icon/avatar.svg"}
        className="w-[60px] h-[60px]"
      />
      <div className="flex flex-col ml-[11px]">
        <h5>{user?.user_metadata.nickname ?? user?.user_metadata.user}</h5>
        <p className="text-[14px]">{user?.email}</p>
      </div>
      <button className="ml-auto">편집</button>
    </section>
  );
}

export default MyProfile;
