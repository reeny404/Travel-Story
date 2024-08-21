import Image from "next/image";
import { useRouter } from "next/navigation";

type CityImageProps = {
  id: number;
  imageUrl: string;
  name: string;
};
// href={`/recommend/country/${id}/detail`}
function CityImage({ id, imageUrl, name }: CityImageProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/recommend/city/${id}`)}
      className="relative w-full h-[82px] hover:opacity-90 active:opacity-70"
    >
      <div className="relative w-full h-[74px] aspect-square">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="absolute rounded-2xl bottom-0 w-full h-7 flex items-center justify-center bg-brand-300 leading-6">
        {name}
      </div>
    </div>
  );
}

export default CityImage;
