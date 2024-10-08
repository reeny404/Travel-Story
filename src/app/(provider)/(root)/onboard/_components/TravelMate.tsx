import { TRAVEL_MATES } from "@/constants/onboard";
import BoardContainer from "./BoardContainer";
import ContinentButton from "./SelectButton/ContinentButton";

function TravelMate() {
  return (
    <BoardContainer title={"누구랑\n함께 하시나요?"}>
      <div className="w-full px-4 mb-4">
        <ContinentButton
          index={1}
          text={TRAVEL_MATES[0].text}
          image={TRAVEL_MATES[0].image}
          intent={"full"}
        />
      </div>
      <div className="grid grid-cols-3 w-full px-4 gap-4">
        {TRAVEL_MATES.map((button, index) => {
          if (index === 0) return null;
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

export default TravelMate;
