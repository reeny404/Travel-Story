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

const TITLE_PADDING = 189;

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
    "md:text-lime-700": krCategory === "관광지",
    "md:text-danger-400": krCategory === "식당",
  });

  const moreDescTextColorClass = clsx({
    [moreDescTextColor]: width >= 768,
    [`text-${textColor}`]: width < 768,
  });

  const moreDescBackgroundColorClass = clsx({
    "md:bg-primary": textColor === "primary" && width >= 768,
    "md:bg-white": textColor === "white" && width >= 768,
  });

  const hoverClass = clsx({
    "md:hover:bg-primary md:hover:text-white":
      textColor === "white" && width >= 768,
    "md:hover:bg-white md:hover:text-primary":
      textColor !== "white" && width >= 768,
  });

  return (
    <section className="relative w-full">
      <article
        className={clsx(
          "relative w-[calc(100%-16px)] h-[704px] my-12 ml-4 pt-[26px] pb-4 rounded-tl-[20px] rounded-bl-[20px] md:max-w-[1643px] md:w-full md:h-[1016px] md:pt-[92px] md:pb-[66px]",
          backgroundColorClass
        )}
      >
        <div className="md:relative md:w-full md:h-[154px] md:mb-[104px]">
          <h2
            className={clsx(
              `${dmSerifDisplayFont.className} relative w-full z-10 text-[44px] text-center md:absolute md:text-[128px] md:text-left`,
              titleColorClass
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
                  WebkitTextFillColor:
                    textColor === "primary" ? "#2A2A2A" : "white",
                  clipPath: `polygon(${TITLE_PADDING}px 0, 100% 0, 100% 100%, ${TITLE_PADDING}px 100%)`,
                }}
              >
                {title}
              </span>
            )}
          </h2>
          <div className="flex items-center justify-center w-full mb-[64px] md:pt-[115px]">
            <h3
              className={clsx("font-medium whitespace-nowrap md:text-xl", {
                "text-primary md:pl-[530px]": krCategory === "관광지",
                "text-white md:pl-[490px]": krCategory === "식당",
              })}
            >
              {subTitle}
            </h3>
            {width > 0 && width >= 768 ? (
              <hr className={`ml-4 flex-grow border-${textColor}`} />
            ) : null}
          </div>
        </div>

        <CardSlider
          spacing={20}
          slidesPerView={slidesPerView}
          cards={cardData}
        />

        <div className="flex justify-end items-center md:mt-[116px] md:mx-8 md:my-2">
          <Link href="/recommend/country/1/detail">
            <button
              className={clsx(
                "group flex justify-center items-center mt-[66px] px-4 text-xs md:max-w-[284px] md:w-full md:h-12 md:rounded-full md:transition md:duration-300 md:text-xl md:mt-0 md:px-4 md:py-2",
                moreDescTextColorClass,
                moreDescBackgroundColorClass,
                hoverClass
              )}
              type="button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {moreDesc}
              <SvgIcon
                name="angle-right"
                width={width > 0 && width < 768 ? 16 : 24}
                height={width > 0 && width < 768 ? 16 : 24}
                title="arrow"
                className="md:transition-colors md:duration-300"
                color={
                  width >= 768
                    ? isHovered
                      ? textColor
                      : moreDescIconColor
                    : textColor
                }
              />
            </button>
          </Link>
        </div>
      </article>
    </section>
  );
}

export default RightCardSection;
