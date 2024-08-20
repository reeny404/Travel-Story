function DayMenu({
  days,
  selectedDay,
  onDaySelect,
}: {
  days: number[];
  selectedDay: number;
  onDaySelect: (day: number) => void;
}) {
  if (!days.length) {
    return <></>;
  }

  return (
    <ul className="min-w-full overflow-x-auto flex items-center bg-white no-scrollbar">
      {days.map((day) => (
        <li
          key={day}
          className={`min-w-20 text-center h-10 leading-10 cursor-pointer ${
            day === selectedDay ? "font-bold" : ""
          }`}
          onClick={() => onDaySelect(day)}
        >
          {day}일차
        </li>
      ))}
    </ul>
  );
}

export default DayMenu;
