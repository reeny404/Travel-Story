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
    <div
      className={`h-full py-[10px] px-4 md:px-8 mb-2 flex items-center justify-between`}
    >
      <div className="flex items-center">
        {type && (
          <div className="flex mr-1 h-full w-4 items-center">
            <Image
              src={`/icons/emoji-${type}.svg`}
              alt="type"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>
        )}
        <div className="font-medium items-center">{title}</div>
      </div>
      {linkUrl && (
        <Link href={linkUrl} className="h-full flex items-center ">
          <p className="text-xs text-[#616161]">더보기</p>

          <div className="flex items-center justify-center">
            <Image
              src={`/icons/lgAngle-right.svg`}
              alt="right-arrow"
              width={12}
              height={12}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default CardType;
