import TagButton from "../TagButton";

type PrimaryTagListProps<T extends string> = {
  tagList: T[];
};

function PrimaryTagList<T extends string>({ tagList }: PrimaryTagListProps<T>) {
  return (
    <div className="flex gap-1 ml-2 flex-wrap">
      {tagList.map((tag, idx) => {
        if (idx >= 3) {
          return;
        }
        return (
          <TagButton key={tag} theme="gray" size="xs" isChecked={false}>
            {tag}
          </TagButton>
        );
      })}
    </div>
  );
}

export default PrimaryTagList;
