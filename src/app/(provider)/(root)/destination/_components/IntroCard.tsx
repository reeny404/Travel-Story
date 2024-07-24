import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";
import Link from "next/link";

type IntroCardProps = {
  title: string;
  imageUrl: string;
  items: string[];
};

function IntroCard({ title, imageUrl, items }: IntroCardProps) {
  return (
    <div className="w-[375px] h-full relative">
      <ImageContainer
        isTitle={true}
        title={title}
        size="intro"
        imageUrl={imageUrl}
      />
      <CardForm intent="intro" items={items} />

      <Link
        href={"/destination/country/1"}
        className="flex justify-center items-center bg-black border rounded-3xl text-white w-20 h-12 absolute bottom-[31%] right-3"
      >
        넘기기
      </Link>
    </div>
  );
}

export default IntroCard;
