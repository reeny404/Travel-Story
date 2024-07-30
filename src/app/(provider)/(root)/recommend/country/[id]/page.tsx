"use client";

import { api } from "@/apis/api";
import useRecommendStore from "@/stores/recommend.store";
import { IntroQueryFn, IntroQueryReturn } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import CountryIntroCard from "../../_components/CountryPage/CountryIntroCard";

const QEURY_KEY = "CountryIntroData";
// 일본의 정보는 들어오나 도시의 정보가 존재하지 않아서 뜨지 않음.
type IntroPageProps = {
  params: { id: string };
};
function IntroPage({ params }: IntroPageProps) {
  const countryId = parseInt(params.id);
  const { setCountryId } = useRecommendStore();
  useEffect(() => {
    setCountryId(countryId);
  }, []);
  const { data: IntroCountry, isLoading } = useQuery<
    IntroQueryFn,
    AxiosError,
    IntroQueryReturn
  >({
    queryKey: [QEURY_KEY],
    queryFn: async () => {
      const country = await api.country.getCountry(countryId);
      const city = await api.city.getCitiesByCountry(countryId);
      return { country, city };
    },
    select: (data) => {
      const { city, country } = data;
      const cities = city?.data.slice(0, 5).map((city) => {
        if (!city?.krName || !city?.id) {
          throw new Error("krName is undefined");
        }
        return { name: city.krName, id: city.id };
      });
      return { country: country?.data, cities };
    },
    staleTime: 1000 * 60 * 60 * 10,
  });
  return (
    <div className=" h-full w-full ">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {IntroCountry && (
            <CountryIntroCard
              countryId={IntroCountry.country?.id}
              cities={IntroCountry.cities}
              imageUrl={IntroCountry.country.imageUrl}
              title={IntroCountry.country.name}
            />
          )}
        </>
      )}
    </div>
  );
}

export default IntroPage;
