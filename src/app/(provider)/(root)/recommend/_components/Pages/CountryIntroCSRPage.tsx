"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { IntroCountryType } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import CountryIntroCard from "../../_components/CountryPage/CountryIntroCard";

type CountryIntroPageProps = {
  countryId: number;
};

function CountryIntroPage({ countryId }: CountryIntroPageProps) {
  const { data: introCountry, isLoading } = useQuery<IntroCountryType>({
    queryKey: ["introCountry", countryId],
    queryFn: async () => {
      const { data: country } = await api.country.getCountry(countryId);
      const { data: cities } = await api.city.getCitiesByCountry(countryId);

      return { country, cities };
    },
    staleTime: 1000 * 60 * 60 * 10,
  });

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "transparentFixed",
        title: "",
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.white,
            alt: "Search",
            size: 20,
            onClick: () => {},
          },
        ],
      }}
    >
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {introCountry && (
            <CountryIntroCard
              countryId={introCountry.country?.id}
              cities={introCountry.cities}
              imageUrl={introCountry.country?.imageUrl}
              title={introCountry.country?.name}
            />
          )}
        </>
      )}
    </MainLayout>
  );
}

export default CountryIntroPage;
