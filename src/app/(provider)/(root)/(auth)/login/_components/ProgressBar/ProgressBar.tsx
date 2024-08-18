import { useLoginStepStore } from "@/stores/step.store";
import { useEffect, useState } from "react";

function ProgressBar() {
  const { progress, labelColor, setProgress } = useLoginStepStore();
  const [prevColor, setPrevColor] = useState<string>("black");
  const progressPercentage = (progress / 6) * 100;

  useEffect(() => {
    if (labelColor === "green" && progressPercentage !== 100) {
      setProgress(true);
      setPrevColor("green");
    } else if (labelColor === "red" && prevColor === "green") {
      setProgress(false);
    }
  }, [labelColor]);

  return (
    <div
      className={`w-full h-[2px] mt-[52px] sm:hidden ${progress === 0 ? "bg-transparent" : "bg-neutral-150"}`}
    >
      <div
        className="bg-neutral-750 h-[2px] transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
