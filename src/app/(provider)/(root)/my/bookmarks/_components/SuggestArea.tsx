import Link from "next/link";

function SuggestArea() {
  return (
    <div className="w-full py-10 flex flex-col justify-center items-center space-y-4">
      <span>사람들이 많이 가는 곳은 어딜까?</span>
      <Link
        href="/recommend/country/1/detail"
        className="bg-lime-400 rounded px-4 py-1 hover:text-white hover:bg-primary"
      >
        구경가기
      </Link>
    </div>
  );
}

export default SuggestArea;
