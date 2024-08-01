import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import Image from "next/image";

function MySchedule() {
  return (
    <section className="flex w-full items-start justify-between">
      <div className="w-[255px] bg-white px-[17px] pt-[11px] pb-[7px] rounded-lg cursor-pointer">
        <h3 className="font-semibold">밀라노 여행기</h3>
        <p className="text-[12px]">2024.07.18(목) ~ 07.24(수)</p>
      </div>
      <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
        <Icon icon={ICON.map.black} alt="map button" size={26} />
      </div>
      <button className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
        <Image
          src={"/icon/calculator.png"}
          alt="가계부"
          width={26}
          height={26}
        />
      </button>
    </section>
  );
}

export default MySchedule;
