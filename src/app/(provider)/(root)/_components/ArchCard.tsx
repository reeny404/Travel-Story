import Image from "next/image";
import Link from "next/link";

type ArchCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  cityNames: string;
};

const ArchCard = ({ id, imageUrl, title, cityNames }: ArchCardProps) => {
  return (
    <div className="flex flex-col w-[88px] items-center md:w-[113px] lg:w-[125.5px]">
      <Link href={`/recommend/country/${id}/detail`}>
        <div className="relative w-[88px] h-[100px] overflow-hidden md:w-[113px] md:h-[129px] lg:w-[125.5px] lg:h-[143.74px]">
          <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[800px]">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black opacity-40 rounded-t-full rounded-b-[800px]" />
          </div>
          <div className="absolute bottom-7 w-full text-center md:bottom-10 lg:bottom-12">
            <h3 className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
              {title}
            </h3>
          </div>
        </div>
      </Link>
      <p className="text-center mt-2 text-xs text-gray-600 md:text-base">
        {cityNames}
      </p>
    </div>
  );
};

export default ArchCard;
