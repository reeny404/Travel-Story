import BoardContainer from "./BoardContainer";
import ContinentButton from "./SelectButton/ContinentButton";

function TravelMate() {
  const buttons = [
    { text: "혼자", image: "human", intent: "width" },
    { text: "반려동물", image: "dog-face" },
    { text: "친구", image: "highfive" },
    { text: "연인", image: "ring" },
    { text: "부모님", image: "old-woman" },
    { text: "아이", image: "child" },
    { text: "온가족", image: "house" },
  ];
  return (
    <BoardContainer title={"누구랑\n함께 하시나요?"}>
      <div className="w-full px-4">
        <ContinentButton
          index={1}
          text={buttons[0].text}
          image={buttons[0].image}
          intent={"full"}
        />
      </div>
      <div className="grid grid-cols-3 w-full px-4">
        {buttons.map((button, index) => {
          if (index === 0) return null;
          return (
            <ContinentButton
              key={index}
              text={button.text}
              image={button.image}
              index={index}
            />
          );
        })}
      </div>
    </BoardContainer>
  );
}

export default TravelMate;
