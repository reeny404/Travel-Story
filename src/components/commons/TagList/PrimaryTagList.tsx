import { useState } from "react";
import TagButton from "../TagButton";

type PrimaryTagListProps<T extends string> = {
  tagList: T[];
  onTagClick: (tag: T) => void;
};

function PrimaryTagList<T extends string>({
  tagList,
  onTagClick,
}: PrimaryTagListProps<T>) {
  const [selectedTag, setSelectedTag] = useState<T>(tagList[0]);

  const handleTagClick = (tag: T) => {
    setSelectedTag(tag);
    onTagClick(tag);
  };

  return (
    <div className="flex gap-x-3">
      {tagList.map((tag) => (
        <TagButton
          key={tag}
          theme="primary"
          size="sm"
          isChecked={tag === selectedTag}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </TagButton>
      ))}
    </div>
  );
}

export default PrimaryTagList;
