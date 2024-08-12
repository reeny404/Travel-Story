import { api } from "@/apis/api";
import { GroupedArea } from "@/types/Recommend";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CityAreaTypeCSRPage from "../../../_components/Pages/CityAreaTypeCSRPage";

type CityAreaTypeSSRPageProps = {
  params: { id: string; areaType: string };
};

async function CityAreaTypeSSRPage({ params }: CityAreaTypeSSRPageProps) {
  const cityId = parseInt(params.id);
  const areaType = params.areaType;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["totalAreas", cityId],
    queryFn: async () => {
      const { data } = await api.area.getAreasByCountry(cityId, null);

      return data[areaType as keyof GroupedArea];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CityAreaTypeCSRPage cityId={cityId} areaType={areaType} />
    </HydrationBoundary>
  );
}

export default CityAreaTypeSSRPage;
