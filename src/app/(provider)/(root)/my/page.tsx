import MainLayout from "@/components/Layout/MainLayout";
import MyPageSection from "./_components/MyPageSection";

function MyPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "noShadow",
        title: "마이페이지",
        titleAlign: "center",
      }}
    >
      <MyPageSection />
    </MainLayout>
  );
}

export default MyPage;
