import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";

function MySchedule() {
  return (
    <section className="flex mt-12 mb-4">
      <div className="flex-grow h-11 px-5 py-[10px] bg-brand-300 rounded-lg cursor-pointer">
        <p className="w-fit text-lg leading-6 font-semibold">밀라노 여행기</p>
      </div>
      <div className="w-11 h-11 bg-white rounded-lg ml-2">
        <Icon icon={ICON.map.off} />
      </div>
      <div className="w-11 h-11 bg-white rounded-lg ml-2">
        <Icon icon={ICON.calculator.off} />
      </div>
    </section>
  );
}

export default MySchedule;
