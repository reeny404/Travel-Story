import { api } from "@/apis/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CountryDetailCSRPage from "../../../_components/Pages/CountryDetailCSRPage";

type CountryDetailSSRPage = {
  params: { id: string };
};

async function CountryDetailSSRPage({ params }: CountryDetailSSRPage) {
  const countryId = parseInt(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["country", countryId],
    queryFn: async () => {
      const { data } = await api.country.getCountry(countryId);
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["city", countryId],
    queryFn: async () => {
      const { data } = await api.city.getCitiesByCountry(countryId);
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["areas", countryId],
    queryFn: async () => {
      const { data } = await api.area.getAreasByCountry(countryId, 5);
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountryDetailCSRPage
        countryId={countryId}
        dehydratedState={dehydrate(queryClient)}
      />
    </HydrationBoundary>
  );
}

export default CountryDetailSSRPage;
