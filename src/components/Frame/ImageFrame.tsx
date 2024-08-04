import Image from "next/image";

type props = {
  src: string | null;
  alt?: string;
  priority?: boolean;
  className: string;
  round?: "none" | "sm" | "lg" | "full";
};

/**
 * className에 width, height 필수로 넣어줘야 함
 */
function ImageFrame({
  src,
  alt = "img",
  className,
  priority = false,
  round: roundType = "none",
}: props) {
  return (
    <div className={`relative aspect-auto ${className}`}>
      {src && (
        <Image
          className={`rounded-${roundType} object-cover`}
          src={src}
          alt={alt}
          fill
          sizes="with: auto, height: auto"
          priority={priority}
        />
      )}
    </div>
  );
}

export default ImageFrame;
