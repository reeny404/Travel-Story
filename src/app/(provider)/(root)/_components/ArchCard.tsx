import Image from "next/image";

type ArchCardProps = {
  imageUrl: string;
  title: string;
};

const ArchCard = ({ imageUrl, title }: ArchCardProps) => {
  return (
    <div className="relative w-[88px] h-[100px] overflow-hidden">
      <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[800px] bg-neutral-250">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-7 w-full text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
};

export default ArchCard;
