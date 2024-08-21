"use client";

import SvgIcon from "@/components/commons/SvgIcon";
import { HOMECARD_CATEGORY } from "@/constants/category";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { SlideCardProps } from "@/types/Slider";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWindowSize } from "../_hook/useWindowSize";
import BookMarkCard from "../recommend/_components/Cards/BookMarkCard";

const TITLE_PADDING = 189;

type LeftCardSectionProps = {
  textColor?: "primary" | "white";
  krCategory: string;
  cardData: SlideCardProps[];
};

function LeftCardSection({
  textColor = "white",
  krCategory,
  cardData,
}: LeftCardSectionProps) {
  const { width } = useWindowSize();
  const filteredData =
    width >= 768 ? cardData.slice(0, 5) : cardData.slice(0, 4);
  const [firstCard, ...restCards] = filteredData;
  const [isHovered, setIsHovered] = useState(false);

  const categoryData = HOMECARD_CATEGORY[krCategory];
  const {
    title,
    subTitle,
    textTheme,
    moreDesc,
    cardBackgroundColor,
    moreDescTextColor,
    moreDescIconColor,
  } = categoryData;

  const moreDescTextColorClass = clsx({
    "text-info-700": krCategory === "숙소" && width >= 768,
    "text-purple-600": krCategory === "쇼핑" && width >= 768,
    [`text-${textColor}`]: width < 768,
  });

  const moreDescBackgroundColorClass = clsx({
    "bg-white": width >= 768,
    "md:bg-primary": width >= 768 && isHovered,
  });

  const hoverClass = clsx({
    "md:hover:bg-primary md:hover:text-white":
      textColor === "white" && width >= 768,
    "md:hover:bg-white md:hover:text-primary":
      textColor !== "white" && width >= 768,
  });

  return (
    <section className="relative w-full">
      <div
        className={clsx(
          `relative w-[calc(100%-16px)] h-[704px] my-12 pt-[28px] pb-4 rounded-tr-[20px] rounded-br-[20px] md:max-w-[1643px] md:w-full md:h-[1016px] md:pt-[92px] md:pb-[66px] md:px-0`,
          cardBackgroundColor
        )}
      >
        <HeaderSection
          title={title}
          subTitle={subTitle}
          textTheme={textTheme}
          textColor={textColor}
          krCategory={krCategory}
          width={width}
        />

        {/* 모바일 버전 */}
        {width < 768 ? (
          <>
            {firstCard && <LargeCard card={firstCard} />}
            <ul className="flex flex-col mx-auto pt-4 px-7">
              {restCards.map((card) => (
                <SmallCard key={card.id} card={card} />
              ))}
            </ul>
            <div className="flex justify-end mt-4 mr-4">
              <Link href="/recommend/country/1/detail">
                <div className="flex items-center">
                  <span className={`text-xs text-${textColor}`}>
                    {moreDesc}
                  </span>
                  <SvgIcon
                    name="angle-right"
                    width={16}
                    height={16}
                    title="arrow"
                    color={textColor}
                  />
                </div>
              </Link>
            </div>
          </>
        ) : (
          // 데스크톱 버전(768px 이상)
          <>
            <div className="flex gap-2 pl-8 pr-2">
              <div className="w-2/3 grid grid-cols-2 gap-x-10 gap-y-16">
                {restCards.map((card) => (
                  <SmallCard key={card.id} card={card} />
                ))}
              </div>
              <div className="w-1/3">
                {firstCard && <LargeCard card={firstCard} />}
              </div>
            </div>
            <div className="flex justify-start items-center mt-[116px] ml-8">
              <Link href="/recommend/country/1/detail">
                <button
                  className={clsx(
                    "group flex justify-center items-center w-[284px] h-12 py-2 px-4 text-xl rounded-full transition-colors duration-300",
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
                    width={24}
                    height={24}
                    title="arrow"
                    className="transition-colors duration-300"
                    color={isHovered ? textColor : moreDescIconColor}
                  />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

type HeaderSectionProps = {
  title: string;
  subTitle: string;
  textTheme: string;
  textColor: string;
  krCategory: string;
  width: number;
};

const HeaderSection = ({
  title,
  subTitle,
  textTheme,
  textColor,
  krCategory,
  width,
}: HeaderSectionProps) => {
  const titleColorClass = clsx({
    "md:text-info-500": krCategory === "숙소",
    "md:text-[#A25FFF]": krCategory === "쇼핑",
  });
  return (
    <div className="md:relative md:w-full md:h-[154px] md:mb-[129px]">
      <h2
        className={clsx(
          `${dmSerifDisplayFont.className} relative w-full z-10 text-[44px] text-${textColor} text-center md:absolute md:text-[128px] md:text-right ${textTheme}`,
          titleColorClass
        )}
        style={{
          right: width >= 768 ? `-${TITLE_PADDING}px` : undefined,
        }}
      >
        {title}
        {width > 0 && width >= 768 && (
          <span
            className="absolute right-0 top-0 w-full h-full"
            style={{
              WebkitTextFillColor:
                textColor === "primary" ? "#2A2A2A" : "white",
              clipPath: `polygon(0 0, calc(100% - ${TITLE_PADDING}px) 0, calc(100% - ${TITLE_PADDING}px) 100%, 0 100%)`,
            }}
          >
            {title}
          </span>
        )}
      </h2>
      <div className="flex items-center justify-center w-full mb-8 md:mb-[64px] md:pt-[120px]">
        {width > 0 && width >= 768 ? (
          <hr className={`mr-4 flex-grow border-${textColor}`} />
        ) : null}
        <h3
          className={clsx(
            "font-medium whitespace-nowrap text-white md:text-xl",
            {
              "md:pr-[180px]": krCategory === "숙소",
              "md:pr-[390px]": krCategory === "쇼핑",
            }
          )}
        >
          {subTitle}
        </h3>
      </div>
    </div>
  );
};

export default LeftCardSection;

type CardProps = {
  card: SlideCardProps;
};

const SmallCard = ({ card }: CardProps) => (
  <li className="mb-3 list-none">
    <div className="flex w-full rounded-lg">
      <Link href={card.linkUrl} className="relative flex w-full items-center">
        <div className="relative w-20 h-20 flex-shrink-0 mr-3 md:w-[150px] md:h-[162px]">
          <Image
            src={card.imageUrl || "/sampleImg.jpg"}
            alt={card.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 h-full flex flex-col justify-center">
          <h3 className="mt-2 text-white font-semibold md:text-2xl">
            {card.areaName}
          </h3>
          <p className="text-white text-sm mt-1 line-clamp-2 md:text-lg md:line-clamp-3">
            {card.description}
          </p>
        </div>
      </Link>
    </div>
  </li>
);

const LargeCard = ({ card }: CardProps) => (
  <div className="flex justify-center items-center">
    <BookMarkCard
      title={card.country}
      description={card.description}
      imageUrl={card.imageUrl}
      linkUrl={card.linkUrl}
      id={card.id}
      city={card.city}
      country={card.country}
      areaName={card.areaName}
      isMain
    />
  </div>
);
