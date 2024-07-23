import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";

type imageContainerProps = imageVariantProps & {
  title?: string;
  isTitle: boolean;
  imageUrl: string;
} & ComponentProps<"div">;

type imageVariantProps = VariantProps<typeof imageVariant>;

const imageVariant = cva("relative w-full bg-[#f0f0f0] aspect-auto", {
  variants: {
    size: {
      intro: "min-h-[562px]",
      detail: "min-h-[353px]",
      recommend: "min-h-[189px]",
    },
  },
  defaultVariants: {
    size: "intro",
  },
});

const ImageContainer = ({
  size,
  isTitle,
  title,
  imageUrl,
  ...props
}: imageContainerProps) => {
  return (
    <div className={imageVariant({ size })} {...props}>
      <Image src={imageUrl} alt="이미지" layout="fill" objectFit="cover" />
      {isTitle && (
        <h1 className="absolute bottom-0 left-0 -mb-6 text-[64px] font-bold">
          {title}
        </h1>
      )}
      {size === "recommend" && (
        <Image
          src="/cardImages/bookmark.svg"
          alt="bookmark"
          width={20}
          height={20}
          objectFit="contain"
          className="absolute top-2 right-2 z-10"
        />
      )}
    </div>
  );
};

export default ImageContainer;
