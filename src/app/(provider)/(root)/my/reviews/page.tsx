import MainLayout from "@/components/Layout/MainLayout";
import MyReviewList from "./_components/MyReviewList";

function Reviews() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "내 리뷰",
        titleAlign: "center",
      }}
    >
      <MyReviewList />
    </MainLayout>
  );
}

export default Reviews;
