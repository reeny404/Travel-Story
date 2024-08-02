import Image from "next/image";

type CardImgFrameProps = {
  imageUrl: string | null;
  alt: string;
  imageClassName?: string;
  frameClassName?: string;
};

function CardImgFrame({
  imageUrl,
  alt,
  imageClassName,
  frameClassName,
}: CardImgFrameProps) {
  return (
    <div className={`w-full relative ${frameClassName}`}>
      <Image
        src={imageUrl || "/"}
        alt={alt}
        fill
        className={`${imageClassName}`}
      />
    </div>
  );
}

export default CardImgFrame;
