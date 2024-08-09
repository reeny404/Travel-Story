"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function MyMenu() {
  const router = useRouter();
  const pageMoveDiv = "flex flex-col items-center cursor-pointer h-fit";

  const handleBookMarkClick = () => {
    router.push("/my/bookmarks");
  };

  const handleMyTravelClick = () => {
    router.push("/plan");
  };
  return (
    <section className="flex w-full px-8 py-3 justify-around bg-white rounded-lg">
      <div className={pageMoveDiv} onClick={handleMyTravelClick}>
        <Image
          src={"/icons/calendar-black.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">내 여행</p>
      </div>
      <div className="w-[1px] bg-neutral-300"></div>
      <div className={pageMoveDiv} onClick={handleBookMarkClick}>
        <Image
          src={"/icons/lgBookmark-off.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">보관함</p>
      </div>
      <div className="w-[1px] bg-neutral-300"></div>
      <div className={pageMoveDiv}>
        <Image
          src={"/icons/star-black.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">내 리뷰</p>
      </div>
    </section>
  );
}

export default MyMenu;
