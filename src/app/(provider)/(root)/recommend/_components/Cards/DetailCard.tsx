import { dmSerifDisplayFont } from "@/constants/fonts";
import CardImgFrame from "./CardImgFrame";

type DetailCardProps = {
  title: string;
  name?: string;
  imageUrl: string;
  viewRef?: any;
};

function DetailCard({ title, name, imageUrl, viewRef }: DetailCardProps) {
  return (
    <div
      ref={viewRef}
      className="w-full text-neu relative flex justify-center overflow-hidden"
    >
      <div className="z-20 arch-shadow"></div>

      {title && (
        <div className="absolute bottom-4 z-50">
          <p
            className={`${dmSerifDisplayFont.className} h-[58px] flex items-center justify-center text-5xl text-white leading-[57.6px]`}
          >
            {name?.toLocaleUpperCase()}
          </p>
          <p className="text-white font-semibold">{title}</p>
        </div>
      )}

      <CardImgFrame
        imageUrl={imageUrl}
        alt={title}
        frameClassName="aspect-4/5 h-[516px] relative z-10"
        imageClassName="object-cover"
        priority={true}
      />
    </div>
  );
}

export default DetailCard;
