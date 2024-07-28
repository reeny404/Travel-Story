"use client";

import IntroCard from "../_components/IntroCard";
// 굳이 SEO에 노출 될 필요 없음
function IntroPage() {
  // 페이지 작업 때 쓸 코드
  // const { data: country } = useQuery({
  //   queryKey: ["country"],
  //   queryFn: async () => {
  //     const country = await countryInstance.getCountry(1);
  //     const city = await cityInstance.getCitiesById(1, true);
  //     return { country, city };
  //   },
  //   select: (data) => console.log(data),
  //   staleTime: 1000 * 10,
  // });

  const countryInfo = {
    id: 1,
    name: "ITALY",
    imageUrl:
      "https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg",
    area: ["로마", "나폴리", "피렌체", "볼로냐", "베네치아"],
    createdAt: "2024-07-23",
  };

  // countryId 사용해서 area 정보들을 가져오고 그 중 5개의 정보를 items에 넘겨줘야함.

  return (
    <div className=" w-screen h-screen max-h-[812px] flex justify-center">
      <IntroCard
        title={countryInfo.name}
        imageUrl={countryInfo.imageUrl}
        items={countryInfo.area}
      />
    </div>
  );
}

export default IntroPage;
