import { api } from "@/apis/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CountryIntroPage from "../../_components/Pages/CountryIntroCSRPage";

type IntroPageProps = {
  params: { id: string };
};

async function IntroPage({ params }: IntroPageProps) {
  const countryId = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["introCountry", countryId],
    queryFn: async () => {
      const { data: country } = await api.country.getCountry(countryId);
      const { data: cities } = await api.city.getCitiesByCountry(countryId);

      return { country, cities };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountryIntroPage countryId={countryId} />
    </HydrationBoundary>
  );
}

export default IntroPage;
