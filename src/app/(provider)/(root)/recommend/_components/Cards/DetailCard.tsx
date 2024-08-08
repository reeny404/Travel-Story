import CardImgFrame from "./CardImgFrame";

type DetailCardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  viewRef?: any;
};

function DetailCard({
  title,
  description,
  imageUrl,
  viewRef,
}: DetailCardProps) {
  return (
    <div
      ref={viewRef}
      className="w-full text-neu relative flex justify-center overflow-hidden"
    >
      <div className="z-50 arch-shadow"></div>

      {description && (
        <p className="absolute text-white bottom-3 font-semibold z-10">
          {title}
        </p>
      )}

      <CardImgFrame
        imageUrl={imageUrl}
        alt={title}
        frameClassName="aspect-4/5 h-[516px] relative z-10"
        imageClassName="object-fill"
        priority={true}
      />
    </div>
  );
}

export default DetailCard;
