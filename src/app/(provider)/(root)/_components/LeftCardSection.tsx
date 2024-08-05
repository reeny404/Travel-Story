import { dmSerifDisplayFont } from "@/constants/fonts";
import { SlideCardProps } from "@/types/Slider";
import Image from "next/image";
import Link from "next/link";
import BookMarkCard from "../recommend/_components/Cards/BookMarkCard";

type LeftCardSectionProps = {
  title: string;
  subTitle: string;
  textColor?: "black" | "white";
  theme: string;
  category?: string;
  krCategory: string;
  cardData: SlideCardProps[];
};

function LeftCardSection({
  title,
  subTitle,
  textColor = "white",
  theme,
  krCategory,
  cardData,
}: LeftCardSectionProps) {
  const [firstCard, ...restCards] = cardData || [];

  return (
    <section className="relative w-full">
      <div
        className={`w-[calc(100%-16px)] h-[704px] my-12 pt-[26px] rounded-tr-3xl rounded-br-3xl ${theme}`}
      >
        <h2
          className={`${dmSerifDisplayFont.className} text-[44px] text-center text-${textColor}`}
        >
          {title}
        </h2>
        <h3 className={`mb-[54px] font-medium text-center text-${textColor}`}>
          {subTitle}
        </h3>
        {firstCard ? (
          <div className="flex justify-center items-center">
            <BookMarkCard
              title={firstCard.country}
              description={firstCard.description}
              imageUrl={firstCard.imageUrl}
              linkUrl={firstCard.linkUrl}
              id={firstCard.id}
              city={firstCard.city}
              country={firstCard.country}
              areaName={firstCard.areaName}
            />
          </div>
        ) : (
          <div className="text-center text-white">No data available</div>
        )}
        <ul
          style={{ width: "calc(100% - 55.24px)" }}
          className="mx-auto pt-[19px]"
        >
          {restCards.map((card) => (
            <li key={card.id} className="mb-4">
              <div className="relative w-full rounded-lg">
                <Link href={card.linkUrl} className="relative flex w-full">
                  <div className="relative w-20 h-20 flex-shrink-0 mr-4">
                    <Image
                      src={card.imageUrl || "/sampleImg.jpg"}
                      alt={card.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mt-2">{card.areaName}</h3>
                    <p className="text-white text-sm mt-1 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LeftCardSection;
