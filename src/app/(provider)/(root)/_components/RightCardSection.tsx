"use client";

import CardSlider from "@/components/Slider/CardSlider";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { SlideCardProps } from "@/types/Slider";
import { useWindowSize } from "../_hook/useWindowSize";

type RightCardSectionProps = {
  title: string;
  subTitle: string;
  textColor?: "black" | "white";
  textTheme?: string;
  cardBackgroundColor: string;
  category?: string;
  krCategory: string;
  cardData: SlideCardProps[];
};

const TitlePadding = 227;

function RightCardSection({
  title,
  subTitle,
  textColor = "white",
  textTheme = "primary",
  cardBackgroundColor,
  krCategory,
  cardData,
}: RightCardSectionProps) {
  const { width } = useWindowSize();

  return (
    <section className="relative w-full md:w-screen">
      <article
        className={`w-[calc(100%-16px)] h-[704px] my-12 ml-4 pt-[26px] rounded-tl-[20px] rounded-bl-[20px] ${cardBackgroundColor} md:w-full md:h-[1016px] md:ml-[calc(-50vw + 50%)] md:pt-[92px] md:pb-[66px]`}
      >
        <div className="md:relative md:w-screen md:h-[154px] md:mb-[104px]">
          <h2
            className={`${dmSerifDisplayFont.className} relative w-full z-10 text-[44px] text-center md:absolute md:left-[-227px] md:text-[128px] md:text-left md:text-${textTheme}`}
          >
            {title}
            {/* 텍스트의 일정 지점부터 색상 덮어쓰기 */}
            {width > 0 && width >= 768 ? (
              <span
                className={`md:absolute md:left-0 md:top-0 md:w-full md:h-full md:text-${textColor}`}
                style={{
                  WebkitTextFillColor: textColor,
                  clipPath: `polygon(${TitlePadding}px 0, 100% 0, 100% 100%, ${TitlePadding}px 100%)`,
                }}
              >
                {title}
              </span>
            ) : null}
          </h2>
          <h3
            className={`mb-[64px] font-medium text-center text-${textColor} md:absolute md:left-[500px] md:top-[77%] md:text-xl md:text-left`}
          >
            {subTitle}
          </h3>
          <hr className="absolute max-w-[931px] w-full left-[735px] top-[85%] border-primary" />
        </div>
        <CardSlider spacing={20} slidesPerView={1.3} cards={cardData} />
      </article>
    </section>
  );
}

export default RightCardSection;
