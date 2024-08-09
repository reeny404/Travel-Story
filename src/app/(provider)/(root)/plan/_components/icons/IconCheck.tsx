import { HTMLAttributes } from "react";

function IconCheck(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7425 5.25773C18.1525 5.66778 18.1525 6.33261 17.7425 6.74266L9.44957 15.0356C8.64899 15.8361 7.351 15.8361 6.55043 15.0356L3.25753 11.7427C2.84748 11.3326 2.84748 10.6678 3.25753 10.2577C3.66759 9.84768 4.33241 9.84768 4.74246 10.2577L8 13.5153L16.2575 5.25773C16.6676 4.84768 17.3324 4.84768 17.7425 5.25773Z"
        fill="#2A2A2A"
      />
    </svg>
  );
}

export default IconCheck;
