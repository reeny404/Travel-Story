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
      large: "h-[562px]",
      small: "h-[353px]",
    },
  },
  defaultVariants: {
    size: "large",
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
    </div>
  );
};

export default ImageContainer;
