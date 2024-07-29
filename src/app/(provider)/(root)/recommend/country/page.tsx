"use client";

import { api } from "@/apis/api";
import { IntroQueryFn, IntroQueryReturn } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import IntroCard from "../_components/IntroCard";
// [id]로 가야해
// 기존 [id]는 detail [id]로 가야해

const QEURY_KEY = "CountryIntroData";

function IntroPage() {
  const { data: IntroCountry, isLoading } = useQuery<
    IntroQueryFn,
    AxiosError,
    IntroQueryReturn
  >({
    queryKey: [QEURY_KEY],
    queryFn: async () => {
      const country = await api.country.getCountry(1);
      const city = await api.city.getCitiesByCountry(1);
      return { country, city };
    },
    select: (data) => {
      const { city, country } = data;
      const cities = city?.data.slice(0, 5).map((city) => {
        if (!city.krName || !city.id) {
          throw new Error("krName is undefined");
        }
        return { name: city.krName, id: city.id };
      });
      return { country: country?.data, cities };
    },
    staleTime: 1000 * 60 * 60 * 10,
  });
  return (
    <div className=" h-full max-w-[365px] flex ">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <IntroCard
          countryId={IntroCountry?.country?.id!}
          title={IntroCountry?.country?.name!}
          imageUrl={IntroCountry?.country?.imageUrl!}
          items={IntroCountry?.cities!}
        />
      )}
    </div>
  );
}

export default IntroPage;
