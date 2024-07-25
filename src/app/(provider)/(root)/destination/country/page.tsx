"use client";

import { api } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";
import IntroCard from "../_components/IntroCard";

function IntroPage() {
  const { data: country } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const country = await api.country.getCountry(1);
      const city = await api.city.getCitiesByCountry(1);
      return { country, city };
    },
    select: ({ country, city }) => {
      const cities = city?.data.slice(0, 5).map((city) => {
        return { name: city.name, id: city.id };
      });
      return { data: country?.data, cities };
    },
    staleTime: 1000 * 10,
  });

  return (
    <div className=" w-screen h-screen max-h-[812px] flex justify-center">
      <IntroCard
        countryId={country?.data?.id!}
        title={country?.data?.name!}
        imageUrl={country?.data?.imageUrl!}
        items={country?.cities!}
      />
    </div>
  );
}

export default IntroPage;
