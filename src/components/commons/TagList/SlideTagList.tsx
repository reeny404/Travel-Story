import { TagSliderProps } from "@/types/Slider";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TagButton from "../TagButton";
import { TagButtonTheme } from "../TagButton/TagButton";

type SlideTagListProps<T extends string> = {
  tagList: T[];
  theme?: TagButtonTheme;
  onTagClick: (tag: T) => void;
} & TagSliderProps;

// spacing: 태그 간 간격
function SlideTagList<T extends string>({
  tagList,
  onTagClick,
  spacing,
  theme = "primary",
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
            size="sm"
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
