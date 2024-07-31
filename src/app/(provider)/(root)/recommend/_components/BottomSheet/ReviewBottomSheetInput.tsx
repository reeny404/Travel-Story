"use client";

type ReviewBottomSheetInputProps = {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
};
export default function ReviewBottomSheetInput({
  textValue,
  setTextValue,
}: ReviewBottomSheetInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <textarea
      className="border border-gray-400 outline-none rounded-lg m-4 p-2 h-40  text-sm "
      value={textValue}
      onChange={handleChange}
      placeholder={"어떤 경험을 공유하고 싶으신가요?"}
    />
  );
}
