import SvgIcon from "@/components/commons/SvgIcon";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import { useRecentStore } from "@/stores/recent.store";
import RecentArea from "./RecentArea";
import RecentSearch from "./RecentSearch";
import SearchPageTitle from "./SearchPageTitle";

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

      {recentSearch ? (
        <RecentSearch />
      ) : (
        <p className="w-full mt-16 text-center">검색어를 입력해주세요.</p>
      )}
      <div className="w-full my-2">
        <SearchPageTitle title="인기 여행지" className="pl-4" />
        <ArchCardSlider />
        <RecentArea className="pl-4 mb-11" />
      </div>
    </main>
  );
}

export default InitialSearchView;
