import { api } from "@/apis/api";
import { continents, travelMates, travelTypes } from "@/constants/onboard";
import { useOnboardStore } from "@/stores/onboard.store";
import { useLoginStepStore } from "@/stores/step.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type BoardType = {
  title: string;
};

function BoardContainer({ title, children }: PropsWithChildren<BoardType>) {
  const {
    isInputValid,
    progress,
    isSelectedOne,
    isSelectedMany,
    country,
    travelMate,
    setCountry,
    setTravelMate,
    setProgress,
    setIsInputValid,
    setIsSelectedOne,
  } = useOnboardStore();
  const router = useRouter();
  const { nextURL } = useLoginStepStore();

  const handleNextClick = () => {
    const themes: string[] = [];
    if (progress === 3) {
      document.cookie = "hasTravelType=true; path=/";
      isSelectedMany.map((theme) => {
        themes.push(travelTypes[theme - 1].text);
      });
      api.auth.updateUserFilter(
        continents[country - 1].text,
        travelMates[travelMate - 1].label,
        themes
      );
      return router.replace(nextURL);
    } else if (progress === 2) {
      setTravelMate(isSelectedOne);
    } else {
      setCountry(isSelectedOne);
    }
    setProgress(true);
    setIsInputValid(true);
    setIsSelectedOne(0);
    router.push(`/onboard?step=${progress + 1}`);
  };

  return (
    <main
      className="relative flex flex-col items-center w-full px-4 pt-14"
      style={{ minHeight: "calc(100vh - 54px)" }}
    >
      <h1 className="w-full mb-[15%] text-[28px] font-semibold leading-9 whitespace-pre-wrap">
        {title}
      </h1>
      <div className="mb-[15%]">{children}</div>
      <div className="flex-grow"></div>
      <button
        className={`sticky w-full h-11 bottom-5 rounded-lg ${isInputValid ? "bg-neutral-200 text-neutral-450" : "bg-neutral-750 text-white"}`}
        disabled={isInputValid}
        onClick={handleNextClick}
      >
        {progress === 3 ? "시작하기" : "다음으로"}
      </button>
    </main>
  );
}

export default BoardContainer;
