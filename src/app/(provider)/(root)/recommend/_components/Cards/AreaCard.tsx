import RatingIcons from "@/components/Card/RatingIcons";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { useModalStore } from "@/stores/modal.store";
import Image from "next/image";
import Link from "next/link";
export type AreaCardProps = {
  title: string;
  description: string;
  rating?: number;
  imageUrl: string | null;
  linkUrl: string;
  id: number;
};

function AreaCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
  id,
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

  return (
    <div className="w-full h-full relative ">
      <div className="w-full h-[220px] relative aspect-auto">
        <Image src={imageUrl || "/"} alt={title} fill className="object-auto" />
      </div>

      <div className="px-4 py-3">
        <Link href={linkUrl} className="font-bold mt-3 mb-3">
          {title}
        </Link>
        <p className="mb-3">{description}</p>
        <RatingIcons type="small" rating={rating || 0} />
      </div>
      <Image
        src={
          isBookmarked
            ? `/icons/${ICON.bookmark.small.on}.png`
            : `/icons/${ICON.bookmark.small.off}.png`
        }
        alt="bookmark"
        width={10}
        height={10}
        className="h-5 w-5 absolute top-2 right-3 hover:cursor-pointer"
        onClick={toggleBookmark}
      />
    </div>
  );
}

export default AreaCard;
