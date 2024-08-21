import Image from "next/image";
import Link from "next/link";

function MyMenu() {
  const pageMoveDiv = "flex flex-col items-center cursor-pointer h-fit";

  return (
    <section className="flex w-full px-8 py-3 justify-around bg-white rounded-lg z-10 md:h-full md:items-center">
      <Link className={pageMoveDiv} href="/plan">
        <Image
          src={"/icons/calendar-black.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">내 여행</p>
      </Link>
      <div className="w-[1px] bg-neutral-300 h-[44px]"></div>
      <Link className={pageMoveDiv} href="/my/bookmarks">
        <Image
          src={"/icons/lgBookmark-off.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">보관함</p>
      </Link>
      <div className="w-[1px] bg-neutral-300 h-[44px]"></div>
      <Link className={pageMoveDiv} href="/my/reviews">
        <Image
          src={"/icons/star-black.svg"}
          width={20}
          height={20}
          alt="icon"
        />
        <p className="text-sm font-normal mt-2">내 리뷰</p>
      </Link>
    </section>
  );
}

export default MyMenu;
