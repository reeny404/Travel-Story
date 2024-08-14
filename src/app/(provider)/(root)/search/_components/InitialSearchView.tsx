import SvgIcon from "@/components/commons/SvgIcon";
import { useRecentStore } from "@/stores/recent.store";
import RecentSearch from "./RecentSearch";

type InitialSearchViewProps = {
  onSearch?: (term: string) => void;
};

function InitialSearchView({ onSearch }: InitialSearchViewProps) {
  const handleRecommendSearch = () => {
    if (onSearch) {
      onSearch("paris");
    }
  };

  const { recentSearch } = useRecentStore();

  return (
    <main className="flex flex-col justify-start items-center w-full h-[200px] mb-10">
      <div
        className="flex justify-between w-full p-4 cursor-pointer"
        onClick={handleRecommendSearch}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm text-info-500">추천</span>
          <p>2024 파리 올림픽</p>
        </div>
        <SvgIcon name="angle-right" width={15} height={15} title="angle" />
      </div>
      {/* 최근 검색어 자리 */}
      {recentSearch ? (
        <RecentSearch />
      ) : (
        <p className="w-full mt-16 text-center">검색어를 입력해주세요.</p>
      )}
      {/* 추천 검색어 자리 */}
    </main>
  );
}

export default InitialSearchView;
