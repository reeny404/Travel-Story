import React from "react";
type IconProps = {
  className?: string;
};

const MemoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clip-path="url(#clip0_1592_9704)">
      <path
        d="M17.3862 4.61371L14.4829 1.70871C13.9423 1.16549 13.2994 0.73482 12.5914 0.441594C11.8834 0.148368 11.1242 -0.00159465 10.3579 0.000377789H6.59538C5.49072 0.001701 4.43168 0.441113 3.65056 1.22223C2.86945 2.00334 2.43003 3.06238 2.42871 4.16704V15.8337C2.43003 16.9384 2.86945 17.9974 3.65056 18.7785C4.43168 19.5596 5.49072 19.9991 6.59538 20.0004H14.9287C16.0334 19.9991 17.0924 19.5596 17.8735 18.7785C18.6546 17.9974 19.0941 16.9384 19.0954 15.8337V8.73788C19.0975 7.97156 18.9475 7.21245 18.6541 6.50452C18.3607 5.79659 17.9297 5.15391 17.3862 4.61371ZM16.2079 5.79204C16.4623 6.05383 16.6812 6.34804 16.8587 6.66704H13.262C13.041 6.66704 12.8291 6.57925 12.6728 6.42297C12.5165 6.26669 12.4287 6.05472 12.4287 5.83371V2.23704C12.7478 2.41448 13.0423 2.63301 13.3045 2.88704L16.2079 5.79204ZM17.4287 15.8337C17.4287 16.4968 17.1653 17.1326 16.6965 17.6015C16.2276 18.0703 15.5918 18.3337 14.9287 18.3337H6.59538C5.93234 18.3337 5.29645 18.0703 4.82761 17.6015C4.35877 17.1326 4.09538 16.4968 4.09538 15.8337V4.16704C4.09538 3.504 4.35877 2.86812 4.82761 2.39928C5.29645 1.93044 5.93234 1.66704 6.59538 1.66704H10.3579C10.4945 1.66704 10.627 1.69371 10.762 1.70621V5.83371C10.762 6.49675 11.0254 7.13264 11.4943 7.60148C11.9631 8.07032 12.599 8.33371 13.262 8.33371H17.3895C17.402 8.46871 17.4287 8.60038 17.4287 8.73788V15.8337Z"
        fill="#B7B7B7"
      />
    </g>
    <defs>
      <clipPath id="clip0_1592_9704">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0.761719)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default MemoIcon;