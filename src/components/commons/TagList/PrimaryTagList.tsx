import TagButton from "../TagButton";

type PrimaryTagListProps<T extends string> = {
  tagList: T[];
};

function PrimaryTagList<T extends string>({ tagList }: PrimaryTagListProps<T>) {
  return (
    <div className="flex gap-x-2 ml-4 mb-[15px]">
      {tagList.map((tag) => (
        <TagButton key={tag} theme="primary" size="xs" isChecked={false}>
          {tag}
        </TagButton>
      ))}
    </div>
  );
}

export default PrimaryTagList;