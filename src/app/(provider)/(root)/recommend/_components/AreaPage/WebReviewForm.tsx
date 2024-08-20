import { Area, AreaReview } from "@/types/Recommend";
import ReviewList from "./ReviewList";
import ReviewSummaryCard from "./ReviewSummary";

type WebReviewForm = {
  area: Area;
  reviews?: AreaReview[];
  width: number;
};

function WebReviewForm({ area, reviews, width }: WebReviewForm) {
  return (
    <>
      <div className="hidden md:flex flex-col mt-3 mb-3 w-full h-[468px] pb-11 pt-6  px-8 rounded-lg shadow-area-section">
        <header className=" w-full flex justify-between mb-5">
          <span className="text-lg font-bold">리뷰</span>
        </header>
        <div className="flex flex-row-reverse justify-between w-full gap-x-6 ">
          <ReviewSummaryCard
            areaName={area.krName!}
            rating={area.rating ?? 0}
            ratingAmount={reviews?.length || 0}
            areaId={area.id}
          />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 ">
            {reviews && <ReviewList width={width} reviews={reviews} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default WebReviewForm;
