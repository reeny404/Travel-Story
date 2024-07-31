function DateList({ days }: { days: number }) {
  const makeDateList = (days: number) => {
    const dateList = [];
    for (let i = 1; i <= days; i++) {
      dateList.push(
        <div
          key={i}
          className="w-16 p-2 m-2 bg-blue-100 text-center rounded-lg"
        >
          {i}일차
        </div>
      );
    }
    return <div className="flex flex-wrap w-full">{dateList}</div>;
  };
  return makeDateList(days);
}

export default DateList;
