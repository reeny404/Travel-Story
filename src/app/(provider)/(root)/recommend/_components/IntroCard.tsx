"use client";

import CardForm from "@/components/Card/CardForm";
import { IntroQueryReturn } from "@/types/Recommend";
import Link from "next/link";
import InstroSlider from "./InstroSlider";

type IntroCardProps = {
  title: string;
  imageUrl: string;
  items: IntroQueryReturn["cities"];
  countryId: number;
};
function IntroCard({ title, imageUrl, items, countryId }: IntroCardProps) {
  console.log("countryId", countryId);
  return (
    <div className="w-full h-full relative">
      <InstroSlider title={title} imageUrl={imageUrl} countryId={countryId} />
      <CardForm intent="intro" items={items} />
      <Link
        href={`/recommend/country/${countryId}` || "/"}
        className="flex justify-center items-center bg-black border rounded-3xl text-white w-20 h-12 absolute bottom-[31%] right-3"
      >
        넘기기
      </Link>
    </div>
  );
}

export default IntroCard;
