import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import MyPageSection from "./_components/MyPageSection";

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
      <MyPageSection />
    </MainLayout>
  );
}

export default MyPage;
