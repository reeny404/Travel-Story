"use clinet";

import { cva, VariantProps } from "class-variance-authority";
import { useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const tagVariant = cva(
  "px-4 py-2 bg-white rounded-full text-bold hover:brightness-110 cursor-pointer",
  {
    variants: {
      isChecked: {
        true: "text-blue-400",
        false: "",
      },
    },
    defaultVariants: {
      isChecked: false,
    },
  }
);

export type Tag = { index: number; title: string };
type Props = {
  tags: Tag[];
  onClick: (tag: Tag) => void;
} & VariantProps<typeof tagVariant>;

function SwiperTagList({ tags, onClick }: Props) {
  const [selectedTagIndex, setSelectedTagIndex] = useState<number>(0);
  const onTagClick = (tag: Tag) => {
    setSelectedTagIndex(tag.index);
    onClick(tag);
  };

  console.log(tags);

  return (
    <Swiper
      slidesPerView={4}
      freeMode={true}
      modules={[FreeMode]}
      spaceBetween={2}
    >
      {tags.map((tag) => (
        <SwiperSlide key={tag.index}>
          <span
            className={tagVariant({
              isChecked: selectedTagIndex === tag.index,
            })}
            onClick={() => onTagClick(tag)}
          >
            {tag.title}
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperTagList;
