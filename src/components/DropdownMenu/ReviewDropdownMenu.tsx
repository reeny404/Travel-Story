// components/DropdownMenu.tsx
import VanilaImgFrame from "@/app/(provider)/(root)/recommend/_components/VanilaImgFram";
import { useEffect, useRef, useState } from "react";

type DropdownMenu = {
  handleOpen?: () => void;
  handleDelete?: () => void;
};

const ReviewDropdownMenu = ({ handleOpen, handleDelete }: DropdownMenu) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center bg-white rounded-full p-2"
      >
        <VanilaImgFrame
          imageUrl={"/icons/bars-black.svg"}
          alt="icon"
          width="w-5"
          height="h-5"
          frameClassName="bg-white rounded-full relative aspect-auto"
          imageClassName="object-contain"
        />
      </button>
      {isOpen && (
        <div className="absolute right-4 -mt-1 w-24 bg-white border border-gray-100 rounded-md shadow-lg origin-top animate-dropdown">
          <ul
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <li
              onClick={handleOpen}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              수정
            </li>
            <li
              onClick={handleDelete}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              삭제
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewDropdownMenu;
