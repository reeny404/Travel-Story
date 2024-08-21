"use client";

import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { useModalStore } from "@/stores/modal.store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "../../../_hook/useWindowSize";

export type BookMarkCardProps = {
  title: string;
  description: string;
  imageUrl: string | null;
  linkUrl: string;
  id: number;
  city: string;
  country: string;
  areaName: string;
  isMain?: boolean;
};

function BookMarkCard({
  title,
  description,
  imageUrl,
  linkUrl,
  id,
  city,
  country,
  areaName,
  isMain,
}: BookMarkCardProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks();
  const { openModal } = useModalStore();
  const { width } = useWindowSize();
  const { isLoggedIn } = useAuth();
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openModal("로그인하면 일정에 장소를 추가할 수 있어요");
      return;
    }

    isBookmarked(id) ? deleteBookmark.mutate(id) : addBookmark.mutate(id);
  };

  return (
    <div className="relative" style={{ width: "calc(100% - 55.24px)" }}>
      <div
        className="relative w-full h-[200px] bg-white rounded-lg shadow-bookmark-card overflow-hidden"
        style={
          isMain && width >= 768
            ? { width: "380px", height: "380px" }
            : undefined
        }
      >
        <Link href={linkUrl}>
          <div className="w-full h-full relative">
            <Image
              src={imageUrl || "/sampleImg.jpg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
            <p
              className={clsx(
                "text-white font-semibold",
                isMain && width >= 768 ? "text-2xl" : "text-lg"
              )}
            >
              {areaName}
            </p>
            <p
              className={clsx(
                "text-white mt-1 line-clamp-2 overflow-hidden text-ellipsis",
                isMain && width >= 768 ? "text-xl" : "text-sm"
              )}
            >
              {description}
            </p>
          </div>
        </Link>
        <div className="absolute top-2 right-2 p-1 rounded-full shadow-md hover:cursor-pointer">
          <div className="relative w-6 h-6 aspect-square">
            <Image
              src={
                isBookmarked(id)
                  ? `/icons/whiteBookmark-on.svg`
                  : `/icons/whiteBookmark-off.svg`
              }
              alt="bookmark"
              fill
              className="object-contain"
              onClick={toggleBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMarkCard;
