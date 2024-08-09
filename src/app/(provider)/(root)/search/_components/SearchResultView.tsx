"use client";

import AreaTagCard from "@/components/Card/AreaTagCard";
import { Area } from "@/types/Recommend";
import { getCategory } from "@/utils/getCategory";
import { useRouter } from "next/navigation";

type SearchResultViewProps = {
  results: Area[];
  isPending: boolean;
  error: Error | null;
};

const SearchResultView: React.FC<SearchResultViewProps> = ({
  results,
  isPending,
  error,
}) => {
  const router = useRouter();

  if (isPending) {
    return <p>로딩중입니다...</p>;
  }

  if (error) {
    return <p>지금은 에러가 발생했어요! 나중에 다시 검색해주세요.</p>;
  }

  if (!results || results[0] === null) {
    return <p>검색 결과가 없어요...</p>;
  }

  const handleMoveDetail = (areaId: number) => {
    router.push(`/recommend/area/${areaId}`);
  };

  return (
    <section className="w-full px-4">
      {/* <CountryButton
            size="md"
            imgPath={result.imageUrl || "/sampleImg.jpg"}
            alt={result.name}
            imgSize="sm"
            countryName={result.krName ?? ""}
            desc={result.name}
            onClick={() => handleMoveDetail(result.id)}
            isCountry
          /> */}
      {results.map((result) => (
        <>
          <AreaTagCard
            key={result.id}
            image={result.imageUrl || "/sampleImg.jpg"}
            alt={result.name}
            title={result.krName ?? ""}
            tag={getCategory(result.type ?? "")}
            rating={result.rating ?? ""}
            desc={result.description}
            onClick={() => handleMoveDetail(result.id)}
          />
        </>
      ))}
    </section>
  );
};

export default SearchResultView;
