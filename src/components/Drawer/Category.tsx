"use client";

import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CategoryProps = {
  href?: string;
  imgPath: string;
  alt: string;
  label: string;
  hasSubCategory?: boolean;
  children?: React.ReactNode;
  isSelected?: boolean;
  onClick?: (label: string) => void;
};

function Category({
  href,
  imgPath,
  alt,
  label,
  hasSubCategory,
  children,
  isSelected,
  onClick,
}: CategoryProps) {
  const router = useRouter();
  const { closeDrawer } = useDrawerStore();
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(label);
    }

    if (!hasSubCategory && href) {
      router.push(href);
      closeDrawer();
      return;
    }

    if (hasSubCategory) {
      setIsOpen(!isOpen);
    }
  };

  // subCategory 한 개만 열리게 하는 기능
  useEffect(() => {
    if (!isSelected) {
      setIsOpen(false);
    }
  }, [isSelected]);

  // subCategory 열리는 높이 조절
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <>
      <button
        className={`flex justify-between items-center rounded-lg mt-3 mb-3 px-4 py-3 ${
          isSelected ? "bg-brand-300" : "bg-transparent"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <Image src={imgPath} alt={alt} width={20} height={20} />
          <h3
            className={`mt-[2px] text-lg ${
              isSelected ? "font-medium" : "font-normal"
            }`}
          >
            {label}
          </h3>
        </div>
        {hasSubCategory && (
          <Image
            src={`/icons/${ICON.arrow.down.black}.png`}
            alt={alt}
            width={16}
            height={8}
            priority
            className={`transform transition-transform duration-300 ${isOpen && "-rotate-180"}`}
          />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-height duration-300 ease-in-out"
      >
        {isOpen && children}
      </div>
    </>
  );
}

export default Category;
