import Image from "next/image";

type CardImgFrameProps = {
  imageUrl: string | null;
  alt: string;
  height: string;
  imageClassName?: string;
  framClassName?: string;
};

function CardImgFrame({
  imageUrl,
  alt,
  height,
  imageClassName,
  framClassName,
}: CardImgFrameProps) {
  return (
    <div className={`w-full relative aspect-auto ${height} ${framClassName}`}>
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
