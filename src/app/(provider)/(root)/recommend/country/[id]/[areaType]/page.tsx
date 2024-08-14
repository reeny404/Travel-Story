import { api } from "@/apis/api";
import { GroupedArea } from "@/types/Recommend";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CountryAreaTypeCSRPage from "../../../_components/Pages/CountryAreaTypeCSRPage";

type CountryAreaTypeSSRPageProps = {
  params: { id: string; areaType: string };
};

async function CountryAreaTypeSSRPage({ params }: CountryAreaTypeSSRPageProps) {
  const countryId = parseInt(params.id);
  const areaType = params.areaType;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["totalAreas", countryId],
    queryFn: async () => {
      const { data } = await api.area.getAreasByCountry(countryId, null);
      return data[areaType as keyof GroupedArea];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountryAreaTypeCSRPage countryId={countryId} areaType={areaType} />
    </HydrationBoundary>
  );
}

export default CountryAreaTypeSSRPage;
