"use client";

import { api } from "@/apis/api";
import { useAuth } from "@/contexts/auth.contexts";
import { AreaReview } from "@/types/Recommend";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

function MyReviewSection() {
  // const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const [reviews, setReviews] = useState<AreaReview[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      api.review.getReviewsByUser(user.id).then(({ data }) => {
        setReviews(data);
        console.log(data);
      });
    }
  }, [user]);

  // const list: AreaReview[] = reviews?.length
  //   ? reviews.filter((review) => currentTab === review.area.type)
  //   : [];

  return (
    <>
      {/* <section className="py-1 px-4">
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          isGray={true}
        />
      </section> */}
      <section className="space-y-4 pt-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </>
  );
}

export default MyReviewSection;
