import ImageFrame from "@/components/Frame/ImageFrame";

type DetailCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function DetailCard({ title, description, imageUrl }: DetailCardProps) {
  return (
    <>
      <ImageFrame
        src={imageUrl}
        alt="detailCard"
        roundType="sm"
        className="h-[353px]"
      />
      <div className="p-4">
        <p className="text-xl font-bold mt-2 mb-2">{title}</p>
        <p className="">{description}</p>
      </div>
    </>
  );
}

export default DetailCard;
