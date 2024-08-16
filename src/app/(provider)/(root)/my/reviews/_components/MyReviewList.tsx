"use client";

import { api } from "@/apis/api";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useAuth } from "@/contexts/auth.contexts";
import { useTab } from "@/hooks/useTab";
import { AreaReview } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

function MyReviewList() {
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const [reviews, setReviews] = useState<AreaReview[]>([]);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 리뷰 삭제 요청
  const { mutate: deleteReview } = useMutation({
    mutationFn: async ({ id, areaId }: { id: number; areaId: number }) => {
      await api.review.deleteReview({ id, areaId });
    },
    onSuccess: (_, { id }) => {
      // 삭제가 성공하면 로컬 상태에서 해당 리뷰 제거
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
    },
    onError: (error) => {
      console.error("리뷰 삭제 중 오류 발생:", error);
    },
  });

  useEffect(() => {
    if (user) {
      api.review.getReviewsByUser(user.id).then(({ data }) => {
        setReviews(data);
      });
    }
  }, [user]);

  const list: AreaReview[] = reviews?.length
    ? reviews.filter((review) => currentTab === review.area?.type)
    : [];

  const handleReviewDelete = (id: number, areaId: number) => {
    deleteReview({ id, areaId });
  };

  return (
    <>
      <section className="py-1 px-4">
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          isGray={true}
        />
      </section>
      <section className="space-y-4 pt-3">
        {list?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDelete={() => handleReviewDelete(review.id, review.areaId!)}
          />
        ))}
      </section>
    </>
  );
}

export default MyReviewList;
