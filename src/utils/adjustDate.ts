const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function adjustDate(startDate: string, daysToAdd: number): string {
  let date = new Date(startDate);
  let day = date.getDate() + daysToAdd;
  let month = date.getMonth();
  const year = date.getFullYear();

  function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  if (isLeapYear(year)) {
    DAYS_IN_MONTH[1] = 29;
  }

  function adjust(): void {
    while (day > DAYS_IN_MONTH[month]) {
      day -= DAYS_IN_MONTH[month];
      month++;
      if (month >= 12) {
        month = 0;
      }
    }
  }

  adjust();

  const adjustedMonth = (month + 1).toString().padStart(2, "0");
  const adjustedDay = day.toString().padStart(2, "0");
  return `${adjustedMonth}.${adjustedDay}`;
}
export default adjustDate;
