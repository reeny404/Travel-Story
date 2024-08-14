import { City } from "@/types/Recommend";
import InstroSlider from "./InstroSlider";

type CounntryintroCardProps = {
  title: string;
  imageUrl: string | null;
  cities: City[];
  countryId: number;
};

function CountryIntroCard({
  title,
  imageUrl,
  cities,
  countryId,
}: CounntryintroCardProps) {
  return (
    <InstroSlider
      title={title}
      imageUrl={imageUrl}
      countryId={countryId}
      cities={cities}
    />
  );
}

export default CountryIntroCard;
