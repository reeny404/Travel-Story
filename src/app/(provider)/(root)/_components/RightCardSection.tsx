"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import CardSlider from "@/components/Slider/CardSlider";
import { HOMECARD_CATEGORY } from "@/constants/category";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { SlideCardProps } from "@/types/Slider";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useWindowSize } from "../_hook/useWindowSize";

const TITLE_PADDING = 258;

type RightCardSectionProps = {
  textColor?: "primary" | "white";
  krCategory: string;
  cardData: SlideCardProps[];
};

function RightCardSection({
  textColor = "white",
  krCategory,
  cardData,
}: RightCardSectionProps) {
  const { width } = useWindowSize();
  const slidesPerView = width > 620 ? 2.3 : width > 500 ? 1.7 : 1.3;
  const [isHovered, setIsHovered] = useState(false);

  const categoryData = HOMECARD_CATEGORY[krCategory];
  const {
    title,
    subTitle,
    textTheme,
    cardBackgroundColor,
    moreDesc,
    moreDescTextColor,
    moreDescIconColor,
  } = categoryData;

  const backgroundColorClass = clsx({
    "bg-lime-300": krCategory === "관광지",
    "bg-danger-400": krCategory === "식당",
  });

  const titleColorClass = clsx({
    "text-lime-700": krCategory === "관광지",
    "text-danger-400": krCategory === "식당",
  });

  const hoverClass = clsx({
    "hover:bg-primary hover:text-white": textColor === "white",
    "hover:bg-white hover:text-primary": textColor !== "white",
  });

  return (
    <section className="relative w-full md:overflow-x-hidden">
      <article
        className={clsx(
          "w-[calc(100%-16px)] h-[704px] my-12 pt-[26px] rounded-tl-[20px] rounded-bl-[20px] md:max-w-[1723px] md:w-full md:h-[1016px] md:pt-[92px] md:pb-[66px]",
          backgroundColorClass
        )}
      >
        <div className="md:relative md:w-full md:h-[154px] md:mb-[104px]">
          <h2
            className={clsx(
              `${dmSerifDisplayFont.className} relative w-full z-10 text-[44px] text-center md:absolute md:text-[128px] md:text-left ${textTheme}`,
              titleColorClass // 제목 색상 클래스 적용
            )}
            style={{
              left: width >= 768 ? `-${TITLE_PADDING}px` : undefined,
            }}
          >
            {title}
            {width > 0 && width >= 768 && (
              <span
                className="absolute left-0 top-0 w-full h-full"
                style={{
                  WebkitTextFillColor: textColor,
                  clipPath: `polygon(${TITLE_PADDING}px 0, 100% 0, 100% 100%, ${TITLE_PADDING}px 100%)`,
                }}
              >
                {title}
              </span>
            )}
          </h2>
          <h3
            className={clsx(
              "mb-[64px] font-medium text-center md:absolute md:left-[500px] md:top-[77%] md:text-xl md:text-left",
              {
                "text-primary": krCategory === "관광지",
                "text-white": krCategory === "식당",
              }
            )}
          >
            {subTitle}
          </h3>
          <hr
            className={`absolute max-w-[931px] w-full left-[735px] top-[85%] border-${textColor}`}
          />
        </div>

        <CardSlider
          spacing={20}
          slidesPerView={slidesPerView}
          cards={cardData}
        />

        <div className="flex justify-end items-center md:mt-[116px] md:mx-8 md:my-2">
          <Link href="/recommend/country/1/detail">
            <div
              className={clsx(
                "group flex justify-center items-center max-w-[284px] w-full h-12 px-4 py-2 text-sm rounded-full transition duration-300 md:text-xl md:px-6 md:py-2",
                `bg-${textColor} ${moreDescTextColor}`,
                hoverClass
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {moreDesc}
              <SvgIcon
                name="angle-right"
                width={width > 0 && width < 768 ? 16 : 20}
                height={width > 0 && width < 768 ? 16 : 20}
                title="arrow"
                className="transition-colors duration-300 md:ml-2"
                color={isHovered ? `${textColor}` : moreDescIconColor}
              />
            </div>
          </Link>
        </div>
      </article>
    </section>
  );
}

export default RightCardSection;
