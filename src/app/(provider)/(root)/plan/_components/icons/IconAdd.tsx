import { HTMLAttributes } from "react";

function IconAdd(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g id="Icon/add-black">
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8504 2.49941C10.8504 2.02997 10.4698 1.64941 10.0004 1.64941C9.53095 1.64941 9.15039 2.02997 9.15039 2.49941V9.64941H2.00039C1.53095 9.64941 1.15039 10.03 1.15039 10.4994C1.15039 10.9689 1.53095 11.3494 2.00039 11.3494H9.15039V18.4994C9.15039 18.9689 9.53095 19.3494 10.0004 19.3494C10.4698 19.3494 10.8504 18.9689 10.8504 18.4994V11.3494H18.0004C18.4698 11.3494 18.8504 10.9689 18.8504 10.4994C18.8504 10.03 18.4698 9.64941 18.0004 9.64941H10.8504V2.49941Z"
        />
      </g>
    </svg>
  );
}

export default IconAdd;
