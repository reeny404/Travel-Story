import CardSlider from "@/components/Slider/CardSlider";
import { ICON } from "@/constants/icon";
import { SlideCardProps } from "@/types/Slider";
import Image from "next/image";

type CategorySectionProps = {
  theme: string;
  category: string;
};

function CategorySection({ theme, category }: CategorySectionProps) {
  return (
    <section className="w-full">
      <div
        className={`w-[96%] h-[704px] rounded-tr-3xl rounded-br-3xl ${theme}`}
      >
        <CardSlider spacing={20} slidesPerView={1.2} cards={CardMockUpData} />

        <p>더 많은 {category} 보러가기</p>
        <Image
          src={`/icons/${ICON.arrow.right.black}.svg`}
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
    </section>
  );
}

export default CategorySection;

// 삭제 예정
const CardMockUpData: SlideCardProps[] = [
  {
    title: "로마",
    description: "고대의 역사가 살아숨쉬는 도시",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["친구와 함께", "힐링", "식도락", "문화"],
    id: 100,
  },
  {
    title: "파리",
    description: "낭만의 도시 파리에서의 하루",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["예술", "로맨스", "미식", "쇼핑"],
    id: 100001,
  },
  {
    title: "뉴욕",
    description: "멈추지 않는 도시, 뉴욕의 활기찬 거리",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["야경", "엔터테인먼트", "패션", "다양성"],
    id: 100002,
  },
  {
    title: "도쿄",
    description: "전통과 현대가 공존하는 도시, 도쿄",
    imageUrl: "/sampleImg.jpg",
    linkUrl: "#",
    tags: ["애니메이션", "전통", "기술", "쇼핑"],
    id: 100003,
  },
];
