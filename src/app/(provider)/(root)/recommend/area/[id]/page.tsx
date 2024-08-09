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
  // 최대한 펼쳐잇 csr인 것들을 Page에 넣던 머 어떻게 해라
  // 대신 SSR은 아래 최대한 펼치는 식으로 하는 것이 좋다.
  // CSR 컴포넌트 SSR 컴포넌트 스윽스윽
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AreaDetailCSRPage areaId={areaId} />
    </HydrationBoundary>
  );
}
