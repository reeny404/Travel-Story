import CardType from "@/components/Card/CardType";
import { City } from "@/types/Recommend";

function MainCityTemplate({ cities }: { cities: City[] }) {
  const makeCountryCircles = (cities: City[]) => {
    return (
      <>
        {/* 케러셀 적용해서 3개씩 묶어서 나오도록 수정 해야함 */}
        {cities?.map((city: City, idx) => {
          if (idx >= 3) {
            return;
          }
          return (
            <div className="flex w-full items-center m-1" key={city.id}>
              <div className="w-16 h-16 flex justify-center items-center bg-white rounded-full">
                {city.krName}
              </div>
              <div className="flex flex-col w-2/3 ml-5 ">
                <h1 className="text-[15px] font-bold">{city.krName}</h1>
                <p className="text-sm">{city.content}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col p-4 justify-around mt-7 bg-gray-300">
      <CardType linkUrl="/" title="주요 관광지" type="" />
      {makeCountryCircles(cities)}
    </div>
  );
}

export default MainCityTemplate;
