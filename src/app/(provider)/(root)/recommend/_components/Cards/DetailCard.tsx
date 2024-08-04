import ImageFrame from "@/components/Frame/ImageFrame";

type DetailCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function DetailCard({ title, description, imageUrl }: DetailCardProps) {
  return (
    <div className="w-full relative aspect-4/5">
      <ImageFrame
        src={imageUrl}
        alt={title}
        className="w-full min-h-[538px] object-cover"
      />

      {/* <div className="p-4">
        <p className="text-xl font-bold mt-2 mb-2">{title}</p>
        <p className="">{description}</p>
      </div> */}
    </div>
  );
}

export default DetailCard;
