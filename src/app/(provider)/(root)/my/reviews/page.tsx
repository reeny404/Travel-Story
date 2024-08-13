import MainLayout from "@/components/Layout/MainLayout";
import MyReviewSection from "./_components/MyReviewSection";

function Reviews() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 리뷰",
        titleAlign: "center",
      }}
    >
      <></>
      <MyReviewSection />
    </MainLayout>
  );
}

export default Reviews;
