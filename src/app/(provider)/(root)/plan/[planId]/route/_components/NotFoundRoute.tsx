import Link from "next/link";

export function NotFoundRoute({ planId }: { planId: string }) {
  return (
    <div className="px-10 py-8 space-y-4 flex flex-col justify-center items-center">
      <span>경로를 그릴 수 있는 위치 정보가 없습니다.</span>
      <span>일정을 보다 풍부하게 꾸며주세요</span>
      <Link href={`/plan/${planId}`} className="px-4 py-2 bg-lime-400">
        추가 계획하기
      </Link>
    </div>
  );
}
