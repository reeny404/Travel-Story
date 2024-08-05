import React from "react";
type IconProps = {
  className?: string;
};

const BicycleIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15.418 17.5C14.7072 17.5 14.0124 17.2892 13.4214 16.8943C12.8304 16.4994 12.3698 15.9382 12.0978 15.2815C11.8258 14.6248 11.7546 13.9022 11.8933 13.2051C12.0319 12.508 12.3742 11.8677 12.8768 11.3651C13.3794 10.8625 14.0197 10.5202 14.7169 10.3815C15.414 10.2429 16.1366 10.314 16.7932 10.586C17.4499 10.858 18.0112 11.3187 18.4061 11.9096C18.801 12.5006 19.0117 13.1955 19.0117 13.9062C19.0107 14.859 18.6317 15.7725 17.958 16.4463C17.2843 17.12 16.3708 17.4989 15.418 17.5ZM15.418 11.5625C14.9544 11.5625 14.5013 11.6999 14.1159 11.9575C13.7304 12.215 13.43 12.581 13.2526 13.0093C13.0752 13.4376 13.0288 13.9088 13.1193 14.3635C13.2097 14.8181 13.4329 15.2357 13.7607 15.5635C14.0885 15.8913 14.5061 16.1145 14.9607 16.2049C15.4154 16.2954 15.8866 16.249 16.3149 16.0716C16.7431 15.8942 17.1092 15.5938 17.3667 15.2083C17.6243 14.8229 17.7617 14.3698 17.7617 13.9062C17.761 13.2848 17.5138 12.6891 17.0745 12.2497C16.6351 11.8104 16.0394 11.5632 15.418 11.5625Z"
      fill="#2A2A2A"
    />
    <path
      d="M5.10547 17.5C4.39469 17.5 3.69988 17.2892 3.10889 16.8943C2.5179 16.4994 2.05728 15.9382 1.78528 15.2815C1.51328 14.6248 1.44211 13.9022 1.58077 13.2051C1.71944 12.508 2.06171 11.8677 2.56431 11.3651C3.0669 10.8625 3.70725 10.5202 4.40436 10.3815C5.10148 10.2429 5.82407 10.314 6.48074 10.586C7.13741 10.858 7.69868 11.3187 8.09356 11.9096C8.48845 12.5006 8.69922 13.1955 8.69922 13.9062C8.69819 14.859 8.31923 15.7725 7.64549 16.4463C6.97176 17.12 6.05827 17.4989 5.10547 17.5ZM5.10547 11.5625C4.64192 11.5625 4.18878 11.6999 3.80335 11.9575C3.41793 12.215 3.11752 12.581 2.94013 13.0093C2.76274 13.4376 2.71632 13.9088 2.80675 14.3635C2.89719 14.8181 3.12041 15.2357 3.44819 15.5635C3.77597 15.8913 4.19358 16.1145 4.64823 16.2049C5.10287 16.2954 5.57412 16.249 6.00238 16.0716C6.43065 15.8942 6.79669 15.5938 7.05423 15.2083C7.31176 14.8229 7.44922 14.3698 7.44922 13.9062C7.4485 13.2848 7.20133 12.6891 6.76195 12.2497C6.32257 11.8104 5.72685 11.5632 5.10547 11.5625Z"
      fill="#2A2A2A"
    />
    <path
      d="M12.7617 4.99998C12.9264 5.00055 13.0895 4.96848 13.2417 4.90562C13.3938 4.84276 13.532 4.75035 13.6483 4.63375C13.7645 4.51715 13.8565 4.37866 13.9189 4.2263C13.9812 4.07393 14.0128 3.91071 14.0117 3.74607C14.0135 3.58226 13.9827 3.41972 13.921 3.26797C13.8592 3.11622 13.7679 2.9783 13.6522 2.86228C13.5365 2.74625 13.3989 2.65445 13.2473 2.59224C13.0958 2.53004 12.9334 2.49867 12.7695 2.49998C12.6054 2.49947 12.4427 2.53129 12.2909 2.59363C12.139 2.65598 12.0009 2.74762 11.8845 2.86333C11.7681 2.97904 11.6756 3.11655 11.6123 3.26802C11.549 3.41948 11.5161 3.58192 11.5156 3.74607C11.5151 3.91022 11.5469 4.07287 11.6093 4.22472C11.6716 4.37658 11.7633 4.51466 11.879 4.6311C11.9947 4.74754 12.1322 4.84004 12.2837 4.90333C12.4351 4.96663 12.5976 4.99947 12.7617 4.99998Z"
      fill="#2A2A2A"
    />
    <path
      d="M14.6191 7.49998H12.9098C12.8817 7.49998 12.8542 7.49244 12.8301 7.47815C12.806 7.46385 12.7861 7.44333 12.7727 7.41873L11.5328 5.14646C11.4455 4.9776 11.3196 4.83168 11.1653 4.72051C11.0111 4.60935 10.8329 4.53606 10.645 4.50658C10.4572 4.4771 10.2651 4.49226 10.0842 4.55084C9.90334 4.60941 9.7388 4.70975 9.60391 4.84373L6.875 7.59373C6.64574 7.82773 6.51561 8.14116 6.51172 8.46873C6.51172 9.14842 7.00391 9.3906 7.23438 9.52732C8.34766 10.1687 9.13164 10.6379 9.56172 10.8984C9.58458 10.9123 9.60349 10.9319 9.61662 10.9552C9.62976 10.9785 9.63668 11.0049 9.63672 11.0316V13.7316C9.63672 14.0679 9.89531 14.3566 10.2316 14.3734C10.3161 14.3775 10.4005 14.3644 10.4797 14.3349C10.5589 14.3054 10.6314 14.2602 10.6926 14.2019C10.7538 14.1436 10.8026 14.0735 10.836 13.9958C10.8693 13.9182 10.8866 13.8345 10.8867 13.75V10.3906C10.8868 10.2914 10.8632 10.1936 10.818 10.1053C10.7727 10.017 10.7071 9.94071 10.6266 9.88279L9.18125 8.84334C9.16311 8.83036 9.14796 8.81364 9.13681 8.79432C9.12567 8.77499 9.1188 8.7535 9.11665 8.7313C9.1145 8.7091 9.11714 8.68669 9.12437 8.66559C9.13161 8.64449 9.14328 8.62518 9.1586 8.60896L10.7992 6.85935C10.816 6.84135 10.8369 6.82758 10.86 6.81917C10.8832 6.81076 10.908 6.80795 10.9325 6.81096C10.9569 6.81396 10.9803 6.82271 11.0007 6.83649C11.0212 6.85026 11.038 6.86867 11.05 6.89021L11.9023 8.42849C11.9565 8.52601 12.0358 8.60724 12.132 8.66378C12.2281 8.72031 12.3377 8.75007 12.4492 8.74998H14.6367C14.7214 8.75008 14.8052 8.73297 14.8831 8.6997C14.9609 8.66642 15.0312 8.61768 15.0896 8.55642C15.1481 8.49516 15.1935 8.42266 15.2231 8.34332C15.2526 8.26399 15.2658 8.17947 15.2617 8.0949C15.2453 7.75857 14.9555 7.49998 14.6191 7.49998Z"
      fill="#2A2A2A"
    />
  </svg>
);

export default BicycleIcon;