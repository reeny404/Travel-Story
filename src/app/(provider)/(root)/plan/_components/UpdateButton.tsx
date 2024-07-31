"use client";

type UpdateButtonProps = {
  status: string;
  onUpdate: () => void;
  onAdd: () => void;
  onRead: () => void;
};

const UpdateButton = ({
  status,
  onUpdate,
  onAdd,
  onRead,
}: UpdateButtonProps) => {
  const handleClick = () => {
    switch (status) {
      case "read":
        return onRead();
      case "update":
        return onUpdate();
      case "add":
        return onAdd();
      default:
        return "";
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "read":
        return "수정하기";
      case "update":
        return "수정완료";
      case "add":
        return "등록하기";
      default:
        return "";
    }
  };

  return (
    <button
      className="w-[80%] mx-auto my-2 py-2 text-center border border-gray-600 rounded-lg"
      type="button"
      onClick={handleClick}
    >
      {getButtonText()}
    </button>
  );
};

export default UpdateButton;
