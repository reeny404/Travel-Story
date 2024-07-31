"use client";

import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CategoryProps = {
  href?: string;
  imgPath: string;
  alt: string;
  label: string;
  hasSubCategory?: boolean;
  children?: React.ReactNode;
};

function Category({
  href,
  imgPath,
  alt,
  label,
  hasSubCategory,
  children,
}: CategoryProps) {
  const router = useRouter();
  const { closeDrawer } = useDrawerStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!hasSubCategory && href) {
      router.push(href);
      closeDrawer();
      return;
    }

    if (hasSubCategory) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button
        className="flex justify-between items-center bg-white mb-3 p-4"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <Image src={imgPath} alt={alt} width={18} height={18} />
          <h3 className="mt-[2px]">{label}</h3>
        </div>
        {hasSubCategory && (
          <Image
            src={`/icons/${isOpen ? ICON.arrow.up.black : ICON.arrow.down.black}.png`}
            alt={alt}
            width={16}
            height={8}
          />
        )}
      </button>
      {isOpen && children}
    </>
  );
}

export default Category;
