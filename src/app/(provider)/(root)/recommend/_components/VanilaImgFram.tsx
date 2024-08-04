import clsx from "clsx";
import Image from "next/image";

type VanilaImgFrameProps = {
  imageUrl: string;
  alt: string;
  width: string;
  height: string;
  frameClassName?: string;
  imageClassName?: string;
};

function VanilaImgFrame({
  imageUrl,
  alt,
  width,
  height,
  frameClassName,
  imageClassName,
}: VanilaImgFrameProps) {
  return (
    <div className={`${width} ${height} ${frameClassName}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="width:auto, height:auto"
        className={clsx(imageClassName)}
      />
    </div>
  );
}

export default VanilaImgFrame;
