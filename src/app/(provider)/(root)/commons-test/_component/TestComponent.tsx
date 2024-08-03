"use client";

import CountryButton from "@/components/CountryButton";
import SubmitButton from "@/components/commons/SubmitButton";
import TagButton from "@/components/commons/TagButton";
import { ICON } from "@/constants/icon";
import { useState } from "react";
import MainLayout from "../../../../../components/Layout/MainLayout";

function TestComponent() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => setIsChecked(!isChecked);
  return (
    // header에 onClick 이벤트를 설정해야 할 페이지면 이렇게 클라이언트 컴포넌트 안에서 header 호출
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "Test Header",
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.notification.black,
            alt: "Notifications",
            size: 20,
            onClick: () => alert("alert test"),
          },
        ],
      }}
    >
      <section className="container mx-auto p-4 space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">TagButton Example</h2>
          <TagButton
            theme="primary"
            size="sm"
            isChecked={isChecked}
            onClick={toggleChecked}
          >
            Tag Example
          </TagButton>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">CountryButton Example</h2>
          <CountryButton
            size="md"
            imgPath="/sampleImg.jpg"
            alt="Country"
            imgSize="md"
            countryName="Country Name"
            desc="This is a description of the country."
            onClick={() => alert("Country clicked")}
            isCountry={true}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">SubmitButton Example</h2>
          <SubmitButton
            theme="primary"
            size="lg"
            variant="outline"
            onClick={() => alert("Button clicked")}
          >
            Submit
          </SubmitButton>
          <p>삭제 예정의 테스트 페이지입니다.</p>
          <p>헤더 두 개 보이는 것이 정상입니다.</p>
        </section>
      </section>
    </MainLayout>
  );
}

export default TestComponent;
