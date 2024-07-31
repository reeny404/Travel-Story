import { IntroDataType } from "@/types/Recommend";
import Link from "next/link";
import InstroSlider from "./InstroSlider";

type CounntryintroCardProps = {
  title: string;
  imageUrl: string | null;
  cities: IntroDataType["cities"];
  countryId: number;
};

function CountryIntroCard({
  title,
  imageUrl,
  cities,
  countryId,
}: CounntryintroCardProps) {
  return (
    <div className="w-full relative">
      <InstroSlider title={title} imageUrl={imageUrl} countryId={countryId} />
      <div className="p-9 h-64 flex flex-col justify-around">
        {cities.map((city, idx) => {
          return (
            <Link
              key={city.id}
              href={`/recommend/city/${city.id}`}
              className="font-semibold max-w-28"
            >
              {city.name}
            </Link>
          );
        })}
      </div>
      <Link
        href={`/recommend/country/${countryId}/detail`}
        className="flex justify-center items-center bg-black border rounded-3xl text-white w-20 h-12 absolute bottom-[36%] z-10 right-3"
      >
        넘기기
      </Link>
    </div>
  );
}

export default CountryIntroCard;
