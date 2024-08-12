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
    setProgress,
    setIsInputValid,
    setIsSelectedOne,
  } = useOnboardStore();
  const router = useRouter();
  const { nextURL } = useLoginStepStore();

  const handleNextClick = () => {
    if (progress === 3) {
      document.cookie = "hasTravelType=true; path=/";
      return router.replace(nextURL);
    }
    setProgress(true);
    setIsInputValid(true);
    setIsSelectedOne(0);
    router.push(`/onboard?next=${progress + 1}`);
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
