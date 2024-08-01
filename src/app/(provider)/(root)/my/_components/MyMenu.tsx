"use client";
import { useRouter } from "next/navigation";

function MyMenu() {
  const router = useRouter();
  const pageMoveDiv =
    "px-[32px] py-[18.5px] bg-white rounded-lg cursor-pointer";

  const handleBookMarkClick = () => {
    router.push("/my/bookmarks");
  };
  return (
    <section className="flex justify-between w-full">
      <div className={pageMoveDiv}>내 여행</div>
      <div className={pageMoveDiv} onClick={handleBookMarkClick}>
        북마크
      </div>
      <div className={pageMoveDiv}>내 리뷰</div>
    </section>
  );
}

export default MyMenu;
