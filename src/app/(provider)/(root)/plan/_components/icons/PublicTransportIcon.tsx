import React from "react";
type IconProps = {
  className?: string;
};

const PublicTransportIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.8867 0.25H2.63672C2.13944 0.25 1.66252 0.447544 1.31089 0.799175C0.959263 1.15081 0.761719 1.62772 0.761719 2.125V14.625C0.761701 14.8886 0.817369 15.1492 0.925075 15.3898C1.03278 15.6304 1.1901 15.8455 1.38672 16.0211V16.7344C1.38672 17.0037 1.49372 17.2621 1.68419 17.4525C1.87466 17.643 2.13298 17.75 2.40234 17.75H3.49609C3.76545 17.75 4.02378 17.643 4.21425 17.4525C4.40472 17.2621 4.51172 17.0037 4.51172 16.7344V16.5H12.0117V16.7344C12.0117 17.0037 12.1187 17.2621 12.3092 17.4525C12.4997 17.643 12.758 17.75 13.0273 17.75H14.1211C14.3905 17.75 14.6488 17.643 14.8392 17.4525C15.0297 17.2621 15.1367 17.0037 15.1367 16.7344V16.0211C15.3333 15.8455 15.4907 15.6304 15.5984 15.3898C15.7061 15.1492 15.7617 14.8886 15.7617 14.625V2.125C15.7617 1.62772 15.5642 1.15081 15.2125 0.799175C14.8609 0.447544 14.384 0.25 13.8867 0.25ZM4.02227 14.618C3.76501 14.646 3.5054 14.5934 3.27927 14.4676C3.05313 14.3418 2.87162 14.1489 2.75979 13.9155C2.64795 13.6822 2.6113 13.4198 2.65489 13.1648C2.69847 12.9097 2.82016 12.6744 3.00314 12.4914C3.18613 12.3084 3.42139 12.1868 3.67647 12.1432C3.93155 12.0996 4.19388 12.1362 4.42724 12.2481C4.66061 12.3599 4.85351 12.5414 4.97933 12.7675C5.10515 12.9937 5.15769 13.2533 5.12969 13.5105C5.09887 13.7937 4.9723 14.0578 4.77091 14.2592C4.56952 14.4606 4.3054 14.5872 4.02227 14.618ZM7.48047 10.25H2.63672C2.47096 10.25 2.31199 10.1842 2.19478 10.0669C2.07757 9.94973 2.01172 9.79076 2.01172 9.625V4.625C2.01172 4.45924 2.07757 4.30027 2.19478 4.18306C2.31199 4.06585 2.47096 4 2.63672 4H7.48047C7.52191 4 7.56165 4.01646 7.59095 4.04576C7.62026 4.07507 7.63672 4.11481 7.63672 4.15625V10.0938C7.63672 10.1352 7.62026 10.1749 7.59095 10.2042C7.56165 10.2335 7.52191 10.25 7.48047 10.25ZM8.26172 2.75H2.65469C2.31875 2.75 2.02969 2.49219 2.0125 2.15664C2.00821 2.07201 2.02118 1.98739 2.05061 1.90792C2.08004 1.82845 2.12533 1.7558 2.18372 1.69438C2.2421 1.63296 2.31237 1.58406 2.39024 1.55064C2.46812 1.51723 2.55198 1.5 2.63672 1.5H13.8688C14.2047 1.5 14.4938 1.75781 14.5109 2.09336C14.5152 2.17799 14.5023 2.26261 14.4728 2.34208C14.4434 2.42155 14.3981 2.4942 14.3397 2.55562C14.2813 2.61704 14.2111 2.66594 14.1332 2.69936C14.0553 2.73277 13.9715 2.75 13.8867 2.75H8.26172ZM9.04297 4H13.8867C14.0525 4 14.2115 4.06585 14.3287 4.18306C14.4459 4.30027 14.5117 4.45924 14.5117 4.625V9.625C14.5117 9.79076 14.4459 9.94973 14.3287 10.0669C14.2115 10.1842 14.0525 10.25 13.8867 10.25H9.04297C9.00153 10.25 8.96179 10.2335 8.93248 10.2042C8.90318 10.1749 8.88672 10.1352 8.88672 10.0938V4.15625C8.88672 4.11481 8.90318 4.07507 8.93248 4.04576C8.96179 4.01646 9.00153 4 9.04297 4ZM11.3937 13.5105C11.3658 13.2533 11.4183 12.9937 11.5441 12.7675C11.6699 12.5414 11.8628 12.3599 12.0962 12.2481C12.3296 12.1362 12.5919 12.0996 12.847 12.1432C13.102 12.1868 13.3373 12.3084 13.5203 12.4914C13.7033 12.6744 13.825 12.9097 13.8686 13.1648C13.9121 13.4198 13.8755 13.6822 13.7637 13.9155C13.6518 14.1489 13.4703 14.3418 13.2442 14.4676C13.018 14.5934 12.7584 14.646 12.5012 14.618C12.218 14.5872 11.9539 14.4606 11.7525 14.2592C11.5511 14.0578 11.4246 13.7937 11.3937 13.5105Z"
      fill="black"
    />
  </svg>
);

export default PublicTransportIcon;