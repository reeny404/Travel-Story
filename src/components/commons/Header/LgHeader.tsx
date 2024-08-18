import SearchBar from "@/components/SearchBar/SearchBar";
import { dmSerifDisplayFont } from "@/constants/fonts";
import SvgIcon from "../SvgIcon";

function LgHeader() {
  return (
    <header className="w-full h-[116px] items-center px-8 hidden sm:block">
      <div className="flex flex-row items-center h-8 text-[12px] space-x-6">
        <div className="flex-grow" />
        <p>마이페이지</p>
        <p>보관함</p>
        <p>로그인</p>
      </div>
      <div className="flex flex-row w-full items-center justify-between">
        <h1
          className={`${dmSerifDisplayFont.className} text-[28px] leading-[38px] whitespace-nowrap`}
        >
          Travel Story
        </h1>
        <div className="flex flex-row w-[600px] space-x-2">
          <SearchBar />
          <button
            className="p-[10px] bg-white rounded-lg shadow-filter-icon hover:opacity-85 active:transform active:scale-95 cursor-pointer active:bg-gray-150"
            type="button"
          >
            <SvgIcon name="slider" width={18} height={18} title="filter" />
          </button>
        </div>
        <div className="flex flex-row items-center text-xl py-3 w-fit">
          <p>여행지</p>
          <div className="mx-4 w-[1px] h-4 bg-neutral-300" />
          <p>내 여행 플래너</p>
        </div>
      </div>
    </header>
  );
}

export default LgHeader;
