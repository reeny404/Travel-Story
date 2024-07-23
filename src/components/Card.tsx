import Image from "next/image";

function Card() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-full h-[353px] bg-[#f0f0f0]">
        <Image
          src="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
          alt="이미지"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 m-2 w-full">
        <h2 className="text-xl font-bold">
          르네상스의 발상지, 예술과 낭만의 중심 이탈리아
        </h2>
        <p className="">
          여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지 소개 여행지
          소개여행지 소개여행지 소개여행지 소개
        </p>
      </div>
    </div>
  );
}

export default Card;
