import SvgIcon from "@/components/commons/SvgIcon";

function RecommendSearchTerm({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="flex justify-between w-full p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm text-info-500">추천</span>
        <p>2024 파리 올림픽</p>
      </div>
      <SvgIcon name="angle-right" width={15} height={15} title="angle" />
    </div>
  );
}

export default RecommendSearchTerm;
