"use client";
import { api } from "@/apis/api";
import Profile from "@/components/Frame/Profile";
import { useAuth } from "@/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";

function MyProfile() {
  const { user } = useAuth();

  const { data: image_url, isPending } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => api.auth.userProfile(user?.email as string),
  });

  const profileUrl = user?.user_metadata.avatar_url ?? image_url;

  if (isPending) return <p>Loading...</p>;
  return (
    <section className="flex items-center mt-[21px] mb-[29px]">
      <Profile
        src={profileUrl ? profileUrl : null}
        className="w-[60px] h-[60px]"
      />
      <div className="flex flex-col ml-[11px]">
        <h5>{user?.user_metadata.nickname ?? user?.user_metadata.name}</h5>
        <p className="text-[14px]">{user?.email}</p>
      </div>
      <button className="ml-auto">편집</button>
    </section>
  );
}

export default MyProfile;
