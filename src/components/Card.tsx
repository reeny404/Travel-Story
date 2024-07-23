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
      <hr />
      <div className="relative w-full h-[562px] bg-[#f0f0f0] aspect-auto 0">
        <Image
          src="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
          alt="이미지"
          fill
          objectFit="cover"
        />
        <h1 className="absolute bottom-0 left-0 -mb-6 text-[64px] font-bold ">
          ITALY
        </h1>
      </div>
      <div className="p-9 pt-7 pb-16 m-2 w-full h-[250px] flex flex-col justify-around">
        <h2 className="font-semibold">로마</h2>
        <h2 className="font-semibold">나폴리</h2>
        <h2 className="font-semibold">피렌체</h2>
        <h2 className="font-semibold">볼로냐</h2>
        <h2 className="font-semibold">베네치아</h2>
      </div>
      <div className="w-[134px] h-1 bg-black opacity-70 fixed bottom-3"></div>
    </div>
  );
}

export default Card;
