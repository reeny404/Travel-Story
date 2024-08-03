import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";

function MyPlanDefault() {
  return (
    <div className="py-4 space-y-12">
      <div className="px-4 space-y-4 flex flex-col">
        <label htmlFor="travel-title">여행 제목</label>
        <input
          id="travel-title"
          placeholder="○○○님의 여행"
          className=" border-b"
        />
      </div>
      <div className="px-4 space-y-4">
        <label>여행 기간</label>
        <div className="flex justify-between items-center">
          <span>2024년 7월 18일 (목)</span>
          <span>-</span>
          <span>2024년 7월 18일 (목)</span>
        </div>
      </div>
      <div className="w-full h-96 bg-gray-300 mx-auto">
        {/* TODO 캘린더로 여행 기간 설정할 수 있도록 */}
        <h4 className="p-4">캘린더 영역 (여행 기간 설정)</h4>
      </div>
      <div className="px-4">
        <label htmlFor="travel-mate" className="block mb-2">
          여행 메이트
        </label>
        <button className="flex items-center">
          {/* TODO 사람 추가하는 아이콘 추가 */}
          <Icon icon={ICON.add.person.black} />
          추가하기
        </button>
      </div>
    </div>
  );
}

export default MyPlanDefault;
