import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import { useRecentStore } from "@/stores/recent.store";
import RecentArea from "./RecentArea";
import RecentSearch from "./RecentSearch";
import RecommendSearchTerm from "./RecommendSearchTerm";
import SearchPageTitle from "./SearchPageTitle";

type InitialSearchViewProps = {
  onSearch?: (term: string) => void;
};

function InitialSearchView({ onSearch }: InitialSearchViewProps) {
  const { recentSearch } = useRecentStore();

  const handleRecommendSearch = () => {
    if (onSearch) {
      onSearch("paris");
    }
  };

  return (
    <main className="flex flex-col justify-start items-center w-full h-[200px] mb-10">
      <RecommendSearchTerm onClick={handleRecommendSearch} />

      {recentSearch ? (
        <RecentSearch onSearch={onSearch} />
      ) : (
        <p className="w-full mt-16 text-center">검색어를 입력해주세요.</p>
      )}
      <section className="w-full my-2 pb-6 md:pb-12">
        <SearchPageTitle title="인기 여행지" className="pl-4" />
        <ArchCardSlider isInitial />
        <RecentArea className="pl-4" isInitial />
      </section>
    </main>
  );
}

export default InitialSearchView;
