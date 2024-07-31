"use client";
import Header from "@/components/commons/Header";
import SubmitButton from "@/components/commons/SubmitButton";
import { ICON } from "@/constants/Icon";
import { useTravelType } from "@/stores/travelType.store";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import SelectForm from "../SelectForm/SelectForm";
import SelectLayout from "../SelectLayout/SelectLayout";

function OnBoard() {
  const { travelType } = useTravelType();
  const router = useRouter();

  const theme = [
    "힐링",
    "액티비티",
    "식도락",
    "쇼핑",
    "문화체험",
    "전시관람",
    "자연",
    "도심",
  ];
  const season = ["봄", "여름", "가을", "겨울"];
  const travelMate = [
    "혼자",
    "친구와",
    "연인과",
    "가족과",
    "부모님 모시고",
    "아이와",
    "반려동물과",
  ];

  const handleTravelTypeClick = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    localStorage.setItem("userTravelType", JSON.stringify(travelType));
    document.cookie = "hasTravelType=true; path=/";
    router.push("/");
  };

  return (
    <div className="flex flex-col bg-[#f5f5f5] h-screen">
      <Header
        backgroundColor="transparent"
        title=""
        leftIcons={[
          {
            icon: ICON.arrow.back.black,
            alt: "back",
            size: 20,
            path: "back",
          },
        ]}
      />
      <div className="flex flex-col px-[13px] flex-grow">
        <h1 className="text-[24px] font-bold mb-4">
          나한테 딱 맞춘 여행
          <br /> 맞춤설정
        </h1>
        <form className="flex flex-col items-center">
          <SelectLayout title="어디로 떠나시나요?">
            <SelectForm type="input" category="country"></SelectForm>
          </SelectLayout>
          <SelectLayout title="여행 테마가 무엇인가요?">
            <SelectForm buttonList={theme} category="theme"></SelectForm>
          </SelectLayout>
          <SelectLayout title="언제 떠나시나요?">
            <SelectForm buttonList={season} category="season"></SelectForm>
          </SelectLayout>
          <SelectLayout title="누구와 떠나시나요?">
            <SelectForm
              buttonList={travelMate}
              category="travelMate"
            ></SelectForm>
          </SelectLayout>
          <SubmitButton
            theme="primary"
            size="lg"
            onClick={(e) => handleTravelTypeClick(e)}
          >
            설정 저장
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default OnBoard;
