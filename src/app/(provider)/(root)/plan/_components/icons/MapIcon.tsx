import React from "react";
type IconProps = {
  className?: string;
};

const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="21"
    height="21"
    className={className}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1166_42220)">
      <path
        d="M17.9951 1.05766L17.9776 1.05182L15.7151 0.301825C14.9336 0.0423719 14.0928 0.0194698 13.2984 0.235992L8.65172 1.58516C8.08276 1.73594 7.47898 1.68287 6.94505 1.43516L6.52839 1.24182C5.89555 0.978636 5.20755 0.875622 4.52538 0.941913C3.84321 1.0082 3.18792 1.24175 2.6176 1.62186C2.04727 2.00197 1.57952 2.51689 1.25579 3.12101C0.932061 3.72512 0.762358 4.39977 0.761719 5.08515L0.761719 15.1476C0.76347 16.0487 1.05655 16.9251 1.59721 17.646C2.13788 18.3669 2.89715 18.8936 3.76172 19.1476L6.15255 19.8976C6.5559 20.023 6.976 20.0863 7.39839 20.0851C7.7749 20.0899 8.15005 20.0391 8.51172 19.9343L13.3451 18.601C13.7867 18.4812 14.2528 18.4849 14.6926 18.6118L16.6451 19.1751C17.1352 19.2936 17.6459 19.2994 18.1386 19.1919C18.6314 19.0845 19.0933 18.8666 19.4896 18.5548C19.8859 18.2429 20.2063 17.8452 20.4267 17.3916C20.647 16.938 20.7616 16.4403 20.7617 15.936V4.98182C20.7605 4.12252 20.4941 3.28454 19.9989 2.58224C19.5038 1.87993 18.804 1.34752 17.9951 1.05766ZM4.24172 17.551C3.72031 17.4002 3.26179 17.0845 2.93488 16.6512C2.60797 16.218 2.43026 15.6904 2.42839 15.1476V5.08515C2.42434 4.67239 2.52418 4.26523 2.71874 3.90117C2.91329 3.53711 3.1963 3.22784 3.54172 3.00182C3.95272 2.72919 4.43518 2.58422 4.92839 2.58516C5.24644 2.58524 5.56135 2.64811 5.85505 2.77016C5.85505 2.77016 6.47589 3.03599 6.59422 3.07849V18.2868L4.24172 17.551ZM8.26172 18.2743V3.31765C8.54477 3.30264 8.82561 3.25936 9.10005 3.18849L13.2617 1.97932V16.9185L8.26172 18.2743ZM19.0951 15.936C19.0952 16.1856 19.0393 16.4321 18.9315 16.6572C18.8237 16.8823 18.6666 17.0803 18.472 17.2366C18.2774 17.3929 18.0502 17.5035 17.8071 17.5602C17.564 17.617 17.3112 17.6183 17.0676 17.5643L14.9284 16.9618V1.81432L17.4434 2.63016C17.9267 2.80528 18.3445 3.12489 18.64 3.54559C18.9355 3.96629 19.0943 4.46772 19.0951 4.98182V15.936Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1166_42220">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0.761719 0.0849609)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default CheckIcon;
