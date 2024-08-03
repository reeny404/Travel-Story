import PrimaryTagList from "@/components/commons/TagList/PrimaryTagList";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { useModalStore } from "@/stores/modal.store";
import Image from "next/image";
import Link from "next/link";
import CardImgFrame from "./CardImgFrame";
export type AreaCardProps = {
  title: string;
  description: string;
  rating?: number;
  imageUrl: string | null;
  linkUrl: string;
  id: number;
  city: string;
  country: string;
  areaName: string;
};

function AreaCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
  id,
  city,
  country,
  areaName,
}: AreaCardProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks(id);
  const { openModal } = useModalStore();
  const { isLoggedIn } = useAuth();
  const toggleBookmark = () => {
    if (!isLoggedIn) {
      openModal("로그인 필요", "로그인 유저만 가능합니다");
    } else {
      isBookmarked ? deleteBookmark.mutate() : addBookmark.mutate();
    }
  };
  const mockTags = ["친구와 함께", "문화체험", "도심"];

  return (
    <>
      <Link href={linkUrl} className="w-full relative ">
        <CardImgFrame
          imageUrl={imageUrl}
          alt={title}
          frameClassName="aspect-square"
          imageClassName="object-cover"
          city={city}
          country={country}
          areaName={areaName}
        />
      </Link>
      {/* TODO areaCardShadow 해결해야댐 일단 넘김 */}
      <div className="pb-5 shadow-area-card ">
        <p className="px-4 pt-4 mb-3 text-sm text-ellipsis line-clamp-2 leading-5">
          {description}
        </p>

        <PrimaryTagList tagList={mockTags} />
      </div>
      {/* bookmark 쉐도우 해결해야댐 */}
      <div className="absolute  p-[10px] top-2 right-2  hover:cursor-pointer">
        <div className="relative w-6 h-6 aspect-square">
          <Image
            src={
              isBookmarked
                ? `/icons/${ICON.bookmark.big.on.name}.svg`
                : `/icons/whiteBookmark-off.svg`
            }
            alt="bookmark"
            fill
            className="object-contain "
            onClick={toggleBookmark}
          />
        </div>
      </div>
    </>
  );
}

export default AreaCard;
