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
    <div ref={viewRef} className="w-full relative flex justify-center">
      {/* <div className="absolute w-full -z-20 inset-0 bg-black opacity-30"></div> */}
      {description && (
        <p className=" absolute text-white bottom-3 font-semibold z-10 ">
          {title}
        </p>
      )}

      <CardImgFrame
        imageUrl={imageUrl}
        alt={title}
        frameClassName="aspect-4/5 h-[516px]"
        imageClassName="object-fill"
        priority={true}
      />
    </div>
  );
}

export default DetailCard;
