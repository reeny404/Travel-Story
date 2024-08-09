import BoardContainer from "./BoardContainer";
import ContinentButton from "./SelectButton/ContinentButton";

function Continent() {
  return (
    <BoardContainer title={"어디로\n떠나시나요?"}>
      <div className="flex gap-4 w-full">
        <ContinentButton
          text="아시아"
          image="globe-asia"
          intent={"width"}
          index={1}
        />
        <ContinentButton
          text="유럽"
          image="globe-europe"
          intent={"width"}
          index={2}
        />
      </div>
      <div className="flex w-full justify-between mt-4">
        <ContinentButton
          text="북아메리카"
          image="globe-north-america"
          index={3}
        />
        <ContinentButton
          text="남아메리카"
          image="globe-south-america"
          index={4}
        />
        <ContinentButton text="오세아니아" image="globe-australia" index={5} />
      </div>
    </BoardContainer>
  );
}

export default Continent;
