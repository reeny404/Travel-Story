import CardSlider from "@/components/Slider/CardSlider";
import { dmSerifDisplayFont } from "@/constants/fonts";
import { ICON } from "@/constants/icon";
import { SlideCardProps } from "@/types/Slider";
import Image from "next/image";

const CardMockUpData: SlideCardProps[] = [
  {
    title: "로마",
    description: "고대의 역사가 살아숨쉬는 도시",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["친구와 함께", "힐링", "식도락", "문화"],
    id: 100,
    city: "로마",
    country: "이탈리아",
    areaName: "라치오",
  },
  {
    title: "파리",
    description: "낭만의 도시 파리에서의 하루",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["예술", "로맨스", "미식", "쇼핑"],
    id: 10001,
    city: "파리",
    country: "프랑스",
    areaName: "일 드 프랑스",
  },
  {
    title: "뉴욕",
    description: "멈추지 않는 도시, 뉴욕의 활기찬 거리",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["야경", "엔터테인먼트", "패션", "다양성"],
    id: 10002,
    city: "뉴욕",
    country: "미국",
    areaName: "뉴욕 주",
  },
  {
    title: "도쿄",
    description: "전통과 현대가 공존하는 도시, 도쿄",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["애니메이션", "전통", "기술", "쇼핑"],
    id: 10003,
    city: "도쿄",
    country: "일본",
    areaName: "간토",
  },
];

type CategorySectionProps = {
  title?: string;
  subTitle?: string;
  theme: string;
  category?: string;
  krCategory: string;
};

function CategorySection({ theme, krCategory }: CategorySectionProps) {
  return (
    <section className="w-full">
      <div
        className={`w-[calc(100%-16px)] h-[704px] my-12 ml-4 pt-[26px] rounded-tl-3xl rounded-bl-3xl ${theme}`}
      >
        <h2
          className={`${dmSerifDisplayFont.className} text-[44px] text-center`}
        >
          Tourist spot
        </h2>
        <h3 className="font-medium text-center mb-[64px]">
          그 나라만의 특별한 여행지
        </h3>
        <CardSlider spacing={20} slidesPerView={1.3} cards={CardMockUpData} />
        <div className="flex justify-end items-center px-4 pb-3 mt-[68px]">
          <p className="text-sm">더 많은 {krCategory} 보러가기</p>
          <Image
            src={`/icons/${ICON.arrow.right.black}.svg`}
            alt="arrow"
            width={16}
            height={16}
          />
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
