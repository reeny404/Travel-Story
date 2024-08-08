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
  console.log("123", 123);
  return (
    <div
      ref={viewRef}
      className="w-full text-neu relative flex justify-center overflow-hidden"
    >
      {/* 아치형 그림자 */}
      <div className="z-50 arch-shadow arch-blur"></div>

      {description && (
        <p className="absolute text-white bottom-3 font-semibold z-10">
          {title}
        </p>
      )}

      <CardImgFrame
        imageUrl={imageUrl}
        alt={title}
        frameClassName="aspect-4/5 h-[516px] relative z-10" /* 이미지를 아치형 그림자 아래에 위치 */
        imageClassName="object-fill"
        priority={true}
      />
      {/* 아치형 그림자 */}
    </div>
  );
}

export default DetailCard;
