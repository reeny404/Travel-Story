"use client";

import { ICON } from "@/constants/Icon";
import useDrawerStore from "@/stores/useDrawerStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

type DrawerLinkProps = {
  href?: string;
  imgPath: string;
  alt: string;
  label: string;
  hasArrow?: boolean;
};

function Category({ href, imgPath, alt, label, hasArrow }: DrawerLinkProps) {
  const { closeDrawer } = useDrawerStore();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!hasArrow && href) {
      router.push(href);
      closeDrawer();
    }
  };

  return (
    <button
      className="flex justify-between items-center bg-white mb-3 p-4"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Image src={imgPath} alt={alt} width={18} height={18} />
        <h3 className="mt-[2px]">{label}</h3>
      </div>
      {hasArrow && (
        <Image
          src={`/icons/${ICON.arrow.down.black}.png`}
          alt={alt}
          width={16}
          height={8}
        />
      )}
    </button>
  );
}

export default Category;
