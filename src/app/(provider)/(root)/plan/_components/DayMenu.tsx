function DayMenu({ onDaySelect }: { onDaySelect: (day: number) => void }) {
  const days = [1, 2, 3, 4];

  return (
    <ul className="h-10 min-w-full flex items-center bg-white">
      {days.map((day) => (
        <li
          key={day}
          className="w-32 text-center h-10 leading-10 cursor-pointer"
          onClick={() => onDaySelect(day)}
        >
          {day}일차
        </li>
      ))}
    </ul>
  );
}

export default DayMenu;
