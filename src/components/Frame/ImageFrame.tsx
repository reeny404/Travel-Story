import Image from "next/image";

type props = {
  src: string | null;
  className: string;
  roundType?: "none" | "sm" | "full";
  alt: string;
};

/**
 * className에 width, height 필수로 넣어줘야 함
 */
function ImageFrame({ src, alt, className, roundType = "none" }: props) {
  return (
    <div className={`relative ${className}`}>
      {src && (
        <Image className={`round-[${roundType}]`} src={src} alt={alt} fill />
      )}
    </div>
  );
}

export default ImageFrame;
