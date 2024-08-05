import { HTMLAttributes } from "react";

function IconCheck(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      className="text-lime-500 group-hover:text-white" // svg 가 이상함 black 넣으면 요상한 부분 생김
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1707482373">
        <path
          id="Vector 6"
          d="M1.8457 6.49951L5.1386 9.79241C5.52912 10.1829 6.16229 10.1829 6.55281 9.7924L14.8457 1.49951"
          stroke="#2A2A2A"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default IconCheck;
