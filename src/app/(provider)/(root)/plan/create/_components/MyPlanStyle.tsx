import SelectContainer from "../../../onboard/_components/SelectContainer/SelectContainer";
import SelectForm from "../../../onboard/_components/SelectForm/SelectForm";

function MyPlanStyle() {
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

  return (
    <section className="px-4">
      <SelectContainer title="여행 테마가 무엇인가요?">
        <SelectForm buttonList={theme} category="theme"></SelectForm>
      </SelectContainer>
      <SelectContainer title="언제 떠나시나요?">
        <SelectForm buttonList={season} category="season"></SelectForm>
      </SelectContainer>
      <SelectContainer title="누구와 떠나시나요?">
        <SelectForm buttonList={travelMate} category="travelMate"></SelectForm>
      </SelectContainer>
    </section>
  );
}

export default MyPlanStyle;
