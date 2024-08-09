import { TagSliderProps } from "@/types/Slider";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TagButton from "../TagButton";
import { TagButtonSize, TagButtonTheme } from "../TagButton/TagButton";

type SlideTagListProps<T extends string> = {
  tagList: T[];
  size?: TagButtonSize;
  theme?: TagButtonTheme;
  onTagClick: (tag: T) => void;
} & TagSliderProps;

// spacing: 태그 간 간격
function SlideTagList<T extends string>({
  tagList,
  onTagClick,
  spacing,
  size = "sm",
  theme = "neutral-650",
}: SlideTagListProps<T>) {
  const [selectedTag, setSelectedTag] = useState<T>(tagList[0]);

  const handleTagClick = (tag: T) => {
    setSelectedTag(tag);
    onTagClick(tag);
  };

  return (
    <Swiper spaceBetween={spacing} slidesPerView="auto" grabCursor={true}>
      {tagList.map((tag, index) => (
        <SwiperSlide key={index} style={{ width: "auto" }}>
          <TagButton
            theme={theme}
            size={size}
            isChecked={tag === selectedTag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlideTagList;
