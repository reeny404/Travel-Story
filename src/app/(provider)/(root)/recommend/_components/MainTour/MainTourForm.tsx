import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import { Area, City } from "@/types/Recommend";
import { seperateArr } from "@/utils/seperateArr";
import { ReactNode } from "react";
import { v4 } from "uuid";
import MainTourItem from "./MainTourItem";

type MainTourFormProps = {
  citiesInfo?: City[];
  areasInfo?: Area[];
};
// 도시에 대한 추천, 관광지에 대한 추천 데이터 -> 이를 info로 정했습니다.
// 나라에서 도시에 대한 추천은 드롭다운이 필요하지만 관광지는 그렇지 않습니다.
// 자세히 보기가 필요한가? 사진 또는 이름 클릭 시 이동되게 하면 충분할 것 같음.
function MainTourForm({ citiesInfo, areasInfo }: MainTourFormProps) {
  if (!citiesInfo && !areasInfo) {
    return;
  }
  const seperatedInfo = citiesInfo
    ? seperateArr(citiesInfo, 3)
    : seperateArr(areasInfo!, 3);
  const generateItems = (info: City[] & Area[]) => {
    return (
      <div key={v4()} className="w-full">
        {info?.map((item: any, idx) => {
          return (
            <MainTourItem
              key={idx}
              item={item}
              itemType={citiesInfo ? "city" : "area"}
            />
          );
        })}
      </div>
    );
  };
  const carouselItems: ReactNode[] = seperatedInfo.map(
    (info: City[] & Area[]) => {
      return generateItems(info);
    }
  );

  return (
    <div className="w-full bg-[#F5F5F5] flex flex-col py-4">
      <CardType title="주요 관광지" type="fire" />
      <Carousel slides={carouselItems} />
    </div>
  );
}

export default MainTourForm;
