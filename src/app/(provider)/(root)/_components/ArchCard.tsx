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
    <div className="flex flex-col items-center">
      <Link href={`/recommend/country/${id}/detail`}>
        <div className="relative w-[88px] h-[100px] overflow-hidden">
          <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[800px]">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black opacity-40 rounded-t-full rounded-b-[800px]" />
          </div>
          <div className="absolute bottom-7 w-full text-center">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
        </div>
      </Link>
      <p className="text-center mt-2 text-sm text-gray-600">{cityNames}</p>
    </div>
  );
};

export default ArchCard;
