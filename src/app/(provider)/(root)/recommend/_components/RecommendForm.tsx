import CardType from "@/components/Card/CardType";
import { Area, City, Country } from "@/types/Recommend";
import { seperateArr } from "@/utils/seperateArr";
import RecommendFormItem from "./RecommendFormItem";

// 도시에 대한 추천, 관광지에 대한 추천 데이터 -> 이를 info로 정했습니다.
// 나라에서 도시에 대한 추천은 드롭다운이 필요하지만 관광지는 그렇지 않습니다.
// swiper.js 도입 후 업데이트 예정
// 자세히 보기가 필요한가? 사진 또는 이름 클릭 시 이동되게 하면 충분할 것 같음.
function RecommendForm({ info }: { info: City[] | Country[] | Area[] }) {
  if (!info) return;
  const seperatedInfo = seperateArr(info, 3);

  const generateItems = (info: City[] | Country[]) => {
    return (
      // 이 div를 슬라이드로 바꾸면 될 것 같음.
      <div className="w-full">
        {info?.map((item, idx) => {
          return <RecommendFormItem key={idx} item={item} />;
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col p-4 justify-around mt-7 bg-gray-300">
      <CardType linkUrl="/" title="주요 관광지" type="" />
      <div className="flex w-full">
        {seperatedInfo.map((info: City[] | Country[]) => {
          return generateItems(info);
        })}
      </div>
    </div>
  );
}

export default RecommendForm;
