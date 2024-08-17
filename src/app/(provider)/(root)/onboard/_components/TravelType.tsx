import { TRAVEL_TYPES } from "@/constants/onboard";
import BoardContainer from "./BoardContainer";
import ContinentButton from "./SelectButton/ContinentButton";

function TravelType() {
  return (
    <BoardContainer title={"어떻게\n보내실 건가요?"}>
      <div className="grid grid-cols-3 w-full px-4 gap-4">
        {TRAVEL_TYPES.map((button, index) => {
          return (
            <ContinentButton
              key={index}
              text={button.text}
              image={button.image}
              index={index + 1}
            />
          );
        })}
      </div>
    </BoardContainer>
  );
}

export default TravelType;
