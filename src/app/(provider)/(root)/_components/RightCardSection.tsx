import CardSlider from "@/components/Slider/CardSlider";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { SlideCardProps } from "@/types/Slider";

type RightCardSectionProps = {
  title: string;
  subTitle: string;
  textColor?: "black" | "white";
  theme: string;
  category?: string;
  krCategory: string;
  cardData: SlideCardProps[];
};

function RightCardSection({
  title,
  subTitle,
  textColor = "white",
  theme,
  krCategory,
  cardData,
}: RightCardSectionProps) {
  return (
    <section className="relative w-full">
      <div
        className={`w-[calc(100%-16px)] h-[704px] my-12 ml-4 pt-[26px] rounded-tl-3xl rounded-bl-3xl ${theme}`}
      >
        <h2
          className={`${dmSerifDisplayFont.className} text-[44px] text-center text-${textColor}`}
        >
          {title}
        </h2>
        <h3 className={`mb-[64px] font-medium text-center text-${textColor}`}>
          {subTitle}
        </h3>
        <CardSlider spacing={20} slidesPerView={1.3} cards={cardData} />
        {/* <div className="flex justify-end items-center px-4 absolute bottom-7 right-0">
          <p className="text-xs cursor-pointer">
            더 많은 {krCategory} 보러가기
          </p>
          <Image
            src={`/icons/${ICON.arrow.right.black}.svg`}
            alt="arrow"
            width={16}
            height={16}
          />
        </div> */}
      </div>
    </section>
  );
}

export default RightCardSection;
