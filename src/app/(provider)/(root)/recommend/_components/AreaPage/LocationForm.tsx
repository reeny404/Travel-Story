import { ICON } from "@/constants/icon";
import { Area } from "@/types/Recommend";
import Image from "next/image";

type LocationForm = {
  area: Area;
};

function LocationForm({ area }: LocationForm) {
  return (
    <section className="mb-3 bg-[#E8F97B] rounded-lg">
      <article className="px-4 pt-8">
        <h1 className="pb-7 text-lg font-medium">위치</h1>
        <div className="py-8 flex items-start">
          <Image
            src={`/icons/${ICON.location.black.name}.svg`}
            alt="location"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="ml-3">{area.info.address}</p>
        </div>
        <div className="pb-11 flex items-start">
          <Image
            src={`/icons/${ICON.call.black}.svg`}
            alt="location"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="ml-3">{area.info.phoneNumber}</p>
        </div>
      </article>
    </section>
  );
}

export default LocationForm;
