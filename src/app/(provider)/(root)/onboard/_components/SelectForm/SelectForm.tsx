"use client";
import Icon from "@/components/commons/Icon";
import SelectButton from "../SelectButton/SelectButton";

type SelectFormProps = {
  type?: string;
  buttonList?: string[];
  category?: "theme" | "season" | "travelMate" | "country";
};

function SelectForm({
  type = "button",
  buttonList,
  category = "country",
}: SelectFormProps) {
  return (
    <div className="flex flex-wrap gap-[9px] w-full h-fit mt-4">
      {type === "input" ? (
        <div className="flex w-full rounded-lg bg-white pr-3">
          <Icon icon="search-black" onClick={() => console.log("click Icon")} />
          <input
            className="flex-grow placeholder:text-gray-300 outline-none"
            placeholder="국가를 검색하세요."
          />
        </div>
      ) : category !== "country" ? (
        buttonList?.map((list, index) => {
          return (
            <SelectButton
              key={index}
              text={list}
              category={category}
            ></SelectButton>
          );
        })
      ) : null}
    </div>
  );
}

export default SelectForm;
