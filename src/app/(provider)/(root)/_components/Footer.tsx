import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[297px] bg-gray-100 text-center text-sm pt-[64.5px] pb-[95.5px] px-[39px]">
      <div className="text-gray-500 text-sm space-x-4">
        <div className="p-1">
          <Link href="/pc-version" className="hover:underline">
            PC버전
          </Link>
          <span> • </span>
          <Link href="#" className="hover:underline">
            고객불편신고
          </Link>
          <span> • </span>
          <Link href="#" className="hover:underline">
            웹접근성정책
          </Link>
        </div>
        <div className="p-1">
          <Link href="#" className="font-semibold hover:underline">
            서비스 이용약관
          </Link>
          <span> • </span>
          <Link href="#" className="font-semibold hover:underline">
            개인정보 처리방침
          </Link>
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-6">
        ©2024. Tripstory all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
