import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import { Area, City, GroupedArea } from "@/types/Recommend";
import { seperateArr } from "@/utils/seperateArr";
import { lazy, useCallback, useMemo } from "react";
import { v4 } from "uuid";
const MainTourItem = lazy(() => import("./MainTourItem"));

type MainTourFormProps = {
  areasInfo?: GroupedArea;
};

function MainTourForm({ areasInfo }: MainTourFormProps) {
  const mainTourAreas = useMemo(
    () => [
      ...areasInfo?.place!,
      ...areasInfo?.accommodation!,
      ...areasInfo?.restaurant!,
      ...areasInfo?.shop!,
    ],
    [areasInfo]
  );

  const seperatedInfo = useMemo(
    () => seperateArr(mainTourAreas, 3),
    [mainTourAreas]
  );

  const generateItems = useCallback((info: City[] & Area[]) => {
    return (
      <div key={v4()} className="w-full">
        {info?.map((item: any, idx) => {
          return <MainTourItem key={idx} item={item} itemType={"area"} />;
        })}
      </div>
    );
  }, []);

  const carouselItems: React.ReactNode[] = useMemo(
    () => seperatedInfo.map((info: City[] & Area[]) => generateItems(info)),
    [seperatedInfo, generateItems]
  );

  return (
    <div className="w-full bg-[#F5F5F5] flex flex-col py-4">
      <CardType title="주요 관광지" type="fire" />
      <Carousel slides={carouselItems} />
    </div>
  );
}

export default MainTourForm;
