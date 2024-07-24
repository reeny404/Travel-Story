"use client";

import { useEffect, useState } from "react";
import ImageContainer from "../Card/ImageContainer";

function Carousel() {
  // 이 값이 바뀌면 다음 페이지로
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    let int = setInterval(() => {
      setPage((prev) => (prev + 1 >= 8 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(int);
  }, []);

  return (
    <main className="relative flex h-full w-full flex-col justify-center items-center">
      <div className=" absolute w-full h-full">
        <ImageContainer
          isTitle
          size="detail"
          imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
        />
        <div className="absolute bottom-8 left-10 py-3 px-6 bg-[#0000007c] rounded-lg">
          <h2 className="text-4xl">Beautiful landscape{page}</h2>
          <p className="text-2xl mt-4 text-purple-200">The magic of nature!</p>
        </div>
      </div>

      {/* left arrow -> 클릭 시 page num -1 등등 */}
      <div className="z-10 fixed bottom-1/2 left-4 text-2xl">
        <span>&lt;-</span>
      </div>
    </main>
  );
}

export default Carousel;
