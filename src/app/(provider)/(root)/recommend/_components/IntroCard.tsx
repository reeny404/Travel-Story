"use client";

import CardForm from "@/components/Card/CardForm";
import ImageContainer from "@/components/Card/ImageContainer";
import { IntroCities } from "@/types/Recommend";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IntroCardProps = {
  title: string;
  imageUrl: string;
  items: IntroCities[];
  countryId: number;
};
function IntroCard({ title, imageUrl, items, countryId }: IntroCardProps) {
  const [x, setX] = useState<number>(0);
  const [style, api] = useSpring(() => ({ x: 0 }));
  const movementScale = 0.1;

  const router = useRouter();

  const bind = useDrag((state) => {
    if (state.movement[0] < 0 && state.axis === "x") {
      const newX = state.offset[0] * movementScale;
      api.start({ x: newX });

      if (state.last) {
        setX(newX);
        router.push("/recommmend/country/1");
      }
    }
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: style.x.to((x) => `translateX(${x}px)`),
        touchAction: "none",
      }}
      className="w-[375px]  "
    >
      <div className="w-full h-full relative">
        <ImageContainer
          isTitle={true}
          title={title}
          size="intro"
          imageUrl={imageUrl || "/123"}
        />
        <CardForm intent="intro" items={items} />

        <Link
          href={`/recommmend/country/${countryId}` || "/"}
          className="flex justify-center items-center bg-black border rounded-3xl text-white w-20 h-12 absolute bottom-[31%] right-3"
        >
          넘기기
        </Link>
      </div>
    </animated.div>
  );
}

export default IntroCard;
