import Image from "next/image";

type DetailCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function DetailCard({ title, description, imageUrl }: DetailCardProps) {
  return (
    <>
      <div className="w-full h-[340px] relative aspect-auto">
        <Image src={imageUrl || "/"} alt={title} fill className="object-fill" />
      </div>

      <div className="p-4">
        <p className="text-xl font-bold mt-2 mb-2">{title}</p>
        <p className="">{description}</p>
      </div>
    </>
  );
}

export default DetailCard;
