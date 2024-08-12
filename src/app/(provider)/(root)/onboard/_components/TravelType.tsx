import BoardContainer from "./BoardContainer";
import ContinentButton from "./SelectButton/ContinentButton";

function TravelType() {
  const buttons = [
    { text: "관광", image: "classical-building" },
    { text: "식도락", image: "fork-knife-plate" },
    { text: "쇼핑", image: "gem-stone" },
    { text: "자연", image: "national-park" },
    { text: "힐링", image: "tropical-drink" },
    { text: "액티비티", image: "surfing" },
    { text: "도심", image: "cityscape" },
    { text: "역사·문화", image: "amphora" },
    { text: "전시·관람", image: "violin" },
  ];

  return (
    <BoardContainer title={"어떻게\n보내실 건가요?"}>
      <div className="grid grid-cols-3 w-full px-4 gap-4">
        {buttons.map((button, index) => {
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
