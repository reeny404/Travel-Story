"use client";

import useDrawerStore from "@/stores/drawer.store";
import { Country } from "@/types/Recommend";
import Link from "next/link";

type TripListProps = {
  countries: Country[];
};

function TripList({ countries }: TripListProps) {
  const { closeDrawer } = useDrawerStore();

  return (
    <ul className="flex flex-col w-full mt-1 px-7 pb-3">
      {countries?.map((country) => (
        <Link key={country.id} href={`/recommend/country/${country.id}`}>
          <li
            onClick={closeDrawer}
            className="flex items-center w-full px-4 py-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white active:bg-primary"
          >
            {country.krName}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default TripList;
