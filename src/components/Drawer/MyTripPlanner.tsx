"use client";

import useDrawerStore from "@/stores/drawer.store";
import Link from "next/link";
import { SUB_CATEGORY } from "./subCategory";

function MyTripPlanner() {
  const { closeDrawer } = useDrawerStore();

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  return (
    <ul className="flex flex-col gap-3 pl-7 pr-5 pb-3">
      {SUB_CATEGORY.map((item, index) => (
        <li
          key={index}
          className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white active:bg-primary"
        >
          <Link href={item.path} onClick={handleCloseDrawer}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MyTripPlanner;
