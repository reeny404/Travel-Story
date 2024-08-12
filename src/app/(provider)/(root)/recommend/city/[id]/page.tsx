import { api } from "@/apis/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CityDetailPage from "../../_components/Pages/CityDetailCSRPage";

type CityDetailSSRPage = {
  params: { id: string };
};

async function CityDetailSSRPage({ params }: CityDetailSSRPage) {
  const cityId = parseInt(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["city", cityId],
    queryFn: async () => {
      const { data } = await api.city.getCityById(cityId);
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["areas", cityId],
    queryFn: async () => {
      const { data } = await api.area.getAreasByCity(cityId);
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CityDetailPage
        cityId={cityId}
        dehydratedState={dehydrate(queryClient)}
      />
    </HydrationBoundary>
  );
}

export default CityDetailSSRPage;
