import { IntroDataType } from "@/types/Recommend";
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
    <InstroSlider
      title={title}
      imageUrl={imageUrl}
      countryId={countryId}
      cities={cities}
    />
  );
}

export default CountryIntroCard;
