function DayMenu({
  selectedDay,
  onDaySelect,
}: {
  selectedDay: number;
  onDaySelect: (day: number) => void;
}) {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <ul className="h-10 min-w-full overflow-x-auto flex items-center bg-white">
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
