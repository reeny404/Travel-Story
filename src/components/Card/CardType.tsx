import Image from "next/image";
import Link from "next/link";

type cardTypeProps = {
  type: string;
  title: string;
  linkUrl: string;
};

// 타입은 이미지의 파일명과 동일해야 합니다.

function CardType({ type, title, linkUrl }: cardTypeProps) {
  return (
    <div className="w-full h-4 mb-2 flex items-center justify-between">
      <div className="flex items-center aspect-auto">
        <Image
          src={`/cardImages/${type}.png`}
          alt="type"
          width={16}
          height={16}
          objectFit="cover"
        />
        <h1 className="font-semibold ">{title}</h1>
      </div>
      <Link href={linkUrl} className="flex text-xs text-[#828282]">
        자세히 보기
        <Image
          src={`/cardImages/right-arrow.svg`}
          alt="right-arrow"
          width={12}
          height={12}
          objectFit="cover"
        />
      </Link>
    </div>
  );
}

export default CardType;
