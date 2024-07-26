import { City, Country } from "@/types/Recommend";
import Image from "next/image";

function RecommendFormItem({ item }: { item: City | Country }) {
  console.log("item", item);
  return (
    <section className="flex w-full items-center m-1" key={item.id}>
      <div className="w-16 h-16 bg-white opacity70 rounded-full relative aspect-auto">
        <Image
          src={item.imageUrl!}
          alt="image"
          // 이게 왜 필요하다 뜨는거지..?
          sizes="width"
          fill
          className="rounded-full object-cover w-auto h-auto"
        />
      </div>
      <div className="flex flex-col w-2/3 ml-5 relation">
        <h1 className="text-[15px] font-bold">{item.krName}</h1>
        <p className="text-sm overflow-x-hidden whitespace-nowrap text-ellipsis">
          {item.description}
        </p>
      </div>
    </section>
  );
}

export default RecommendFormItem;
