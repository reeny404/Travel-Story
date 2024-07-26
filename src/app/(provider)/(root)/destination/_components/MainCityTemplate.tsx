import CardType from "@/components/Card/CardType";
// CardType 컴포넌트 수정 필요(여기서 쓰는 모습이 다름)
function MainCityTemplate() {
  const countries = ["로마", "나폴리", "피렌체"];
  const makeCountryCircles = (countries: string[]) => {
    return (
      <>
        {countries.map((country: string) => {
          return (
            <div className="flex w-full items-center m-1" key={country}>
              <div className="w-16 h-16 flex justify-center items-center bg-white rounded-full">
                {country}
              </div>
              <div className="flex flex-col w-2/3 ml-5 ">
                <h1 className="text-[15px] font-bold">{country}</h1>
                <p className="text-sm">
                  여행지 설명 여행지 설명 여행지 설명 여행지 설명 여행지 설명
                </p>
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
      {makeCountryCircles(countries)}
    </div>
  );
}

export default MainCityTemplate;
