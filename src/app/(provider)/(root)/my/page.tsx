import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import MyPageSection from "./_components/MyPageSection";

function MyPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "마이페이지",
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.edit.line,
            alt: "edit",
            size: 18,
          },
        ],
      }}
    >
      <MyPageSection />
    </MainLayout>
  );
}

export default MyPage;
