"use client";

import { api } from "@/apis/api";
import ImageFrame from "@/components/Frame/ImageFrame";
import { getIconPath } from "@/components/commons/Icon/getIconPath";
import { ICON } from "@/constants/icon";
import { Area } from "@/types/Recommend";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MyBookmarkPageParams } from "../page";

type AddtoPlanButtonProps = {
  area: Area;
  plan: MyBookmarkPageParams;
};

function AddToPlanButton({ plan, area }: AddtoPlanButtonProps) {
  const router = useRouter();
  const { planId, day } = plan;
  const isAbleToAddPlan: boolean = !!planId && !!day;

  const handleOnClickToAdd = useCallback(() => {
    api.plan
      .addChild(planId, Number(day), "customPlace", {
        title: area.krName!,
        latlng: { lat: area.lat!, lng: area.lng! },
        areaId: area.id,
      })
      .then(() => router.push(`/plan/${planId}`))
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isAbleToAddPlan && (
        <button
          className="h-8 flex justify-center items-center px-3 mt-4 rounded-full bg-gray-750 text-white"
          onClick={handleOnClickToAdd}
        >
          <ImageFrame
            src={getIconPath(ICON.calendar.white)}
            className="w-4 h-4 mr-2"
          />
          <span>내 여행에 추가</span>
        </button>
      )}
    </>
  );
}

export default AddToPlanButton;
