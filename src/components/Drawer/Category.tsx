"use client";

import { ICON } from "@/constants/Icon";
import useDrawerStore from "@/stores/useDrawerStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "./Menu";

type DrawerLinkProps = {
  href?: string;
  imgPath: string;
  alt: string;
  label: string;
  subCategories?: Menu[];
};

function Category({
  href,
  imgPath,
  alt,
  label,
  subCategories,
}: DrawerLinkProps) {
  const { closeDrawer } = useDrawerStore();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (href) {
      router.push(href);
      closeDrawer();
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
        {subCategories && (
          <Image
            src={`/icons/${ICON.arrow.down.black}.png`}
            alt={alt}
            width={16}
            height={8}
          />
        )}
      </button>
      {subCategories && (
        <div className="px-12 py-4 flex flex-col">
          {subCategories.map((menu, i) => (
            <Link key={i} href={menu.link} className="pb-6">
              {menu.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Category;
