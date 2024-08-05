import { api } from "@/apis/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AreaDetailCSRPage from "../../_components/Pages/AreaDetailCSRPage";

type Props = {
  params: { id: string };
};

export default async function AreaDetailSSRPage({ params }: Props) {
  const areaId = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["area", areaId],
    queryFn: () => api.area.getAreasById(areaId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["areaReviews", areaId],
    queryFn: () => api.review.getReviews(areaId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AreaDetailCSRPage areaId={areaId} />
    </HydrationBoundary>
  );
}
