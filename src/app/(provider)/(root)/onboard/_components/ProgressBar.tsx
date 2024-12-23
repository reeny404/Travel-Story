import { useOnboardStore } from "@/stores/onboard.store";

function ProgressBar() {
  const { progress } = useOnboardStore();
  const progressPercentage = (progress / 4) * 100;
  return (
    <div className="w-full h-[2px] bg-neutral-50">
      <div
        className="bg-brand-500 h-[2px] transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
export default ProgressBar;
