import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";

function MyPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.arrow.back.black,
            alt: "Back",
            size: 20,
            path: "back",
          },
        ],
        title: "마이페이지",
        titleAlign: "center",
      }}
    >
      <div>마이페이지</div>
    </MainLayout>
  );
}

export default MyPage;
