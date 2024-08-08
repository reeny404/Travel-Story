import { useLoginStepStore } from "@/stores/step.store";

function ProgressBar() {
  const { progress } = useLoginStepStore();
  const progressPercentage = (progress / 4) * 100;
  return (
    <div className="w-full h-[2px] bg-neutral-150">
      <div
        className="bg-neutral-750 h-[2px] transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
