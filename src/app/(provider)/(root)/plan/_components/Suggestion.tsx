import Link from "next/link";

function Suggestion() {
  return (
    <p className="flex flex-col my-10 items-center leading-10 text-center">
      <span className="pt-32 pb-2 text-lg font-semibold leading-9">
        <span className="text-sm font-light">예정 중인 여행이 없어요</span>
        <br />
        <span className="text-xl">자유</span>와{" "}
        <span className="text-xl">낭만</span>이 가득한{" "}
        <span className="text-xl transition-all hover:text-2xl">프랑스</span>로
        <br />
        떠나보는 건 어떨까요?
      </span>
      <Link
        href="/recommend/country/1"
        className="mt-4 px-10 bg-lime-300 rounded transition-transform hover:scale-110"
      >
        구경가기
      </Link>
    </p>
  );
}

export default Suggestion;
