import ImageFrame from "@/components/Frame/ImageFrame";
import { TRAVEL_MATES, TRAVEL_TYPES } from "@/constants/onboard";
import { PlanInsertType } from "@/types/plan";
import { useState } from "react";
import TravelMate from "./TravelMate";
import TravelType from "./TravelType";

function getImage(list: any[], text: string): string | null {
  const travelMate = list.find((mate) => mate.text === text);
  return travelMate ? `/onboard/${travelMate.image}.png` : null;
}

type Style = "mate" | "keyword";

type NewPlanStyleProps = {
  data: PlanInsertType;
  set: (data: PlanInsertType) => void;
};

function NewPlanStyle({ data: plan, set }: NewPlanStyleProps) {
  const [showStylePage, setShowStylePage] = useState<Style | null>(null);
  const handleClosePage = () => setShowStylePage(null);

  const handleSetMate = (mate: string) => {
    set({ ...plan, mate });
    handleClosePage();
  };
  const setKeywords = (words: string[]) => {
    set({ ...plan, keywords: words });
    handleClosePage();
  };

  const { mate, keywords } = plan;
  const tarvelTypes = keywords ? (keywords as string[]) : [];

  return (
    <>
      <section className="min-h-[40svh] px-4 pt-9 space-y-16 text-base font-normal">
        <div>
          <div className="pb-3">여행 메이트</div>
          {mate ? (
            <button
              className="px-4 py-2 flex rounded-lg border border-neutral-350"
              onClick={() => setShowStylePage("mate")}
            >
              <ImageFrame
                src={getImage(TRAVEL_MATES, mate)}
                className="w-5 h-5 mr-2"
              />
              {mate}
            </button>
          ) : (
            <button
              className="w-full py-3 text-neutral-400 text-left"
              onClick={() => setShowStylePage("mate")}
            >
              누구와 함께 하시나요?
            </button>
          )}
        </div>
        <div>
          <div>여행 목적</div>
          <div className="flex flex-wrap gap-3">
            {tarvelTypes.length ? (
              tarvelTypes.map((type) => (
                <button
                  key={type}
                  className="px-4 py-2 flex rounded-lg border border-neutral-350"
                  onClick={() => setShowStylePage("keyword")}
                >
                  <ImageFrame
                    src={getImage(TRAVEL_TYPES, type)}
                    className="w-5 h-5 mr-2"
                  />
                  {type}
                </button>
              ))
            ) : (
              <button
                className="w-full py-3 text-neutral-400 text-left"
                onClick={() => setShowStylePage("keyword")}
              >
                어떻게 보내실 건가요?
              </button>
            )}
          </div>
        </div>
      </section>
      {showStylePage === "mate" && (
        <TravelMate setMate={handleSetMate} close={handleClosePage} />
      )}
      {showStylePage === "keyword" && (
        <TravelType setTypes={setKeywords} close={handleClosePage} />
      )}
    </>
  );
}

export default NewPlanStyle;
