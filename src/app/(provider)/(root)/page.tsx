import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full h-full">
      <Link
        href="/commons-test"
        className="flex justify-center items-centerp-2 border border-black rounded hover:bg-slate-100"
      >
        테스트 페이지로 이동
      </Link>
    </main>
  );
}
