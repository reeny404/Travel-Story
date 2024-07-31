import Image from "next/image";
import Link from "next/link";

type CardTypeProps = {
  type?: string;
  title: string;
  linkUrl?: string;
  innerClassName?: string;
};

// 타입은 이미지의 파일명과 동일해야 합니다.

function CardType({ type, title, linkUrl }: CardTypeProps) {
  return (
    <div className={`w-full h-6 mb-4 mt-4 flex items-center justify-between`}>
      <div className="flex items-center aspect-auto gap-x-[2px]">
        {type && (
          <Image
            src={`/cardImages/${type}.png`}
            alt="type"
            width={16}
            height={16}
            className="object-cover"
          />
        )}
        <h1 className="font-semibold ">{title}</h1>
      </div>
      {linkUrl && (
        <Link href={linkUrl} className="flex text-xs text-[#828282]">
          자세히 보기
          <Image
            src={`/cardImages/right-arrow.svg`}
            alt="right-arrow"
            width={12}
            height={12}
            className="object-cover"
          />
        </Link>
      )}
    </div>
  );
}

export default CardType;
