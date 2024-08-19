const DAY = ["일", "월", "화", "수", "목", "금", "토"];

/**
 * @returns Date 타입을 포맷에 맞는 날짜 규격으로 내려준다.
 */
function format(type: string, time: Date | string): string {
  if (!time) {
    return "";
  }

  if (typeof time == 'string') {
    time = new Date(time);
  }

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = DAY[time.getDay()];

  return type
    .toString()
    .replace("yyyy", year + "")
    .replace("MM", month + "")
    .replace("dd", date + "")
    .replace("E", day + "");
}

/**
 * @returns a,b 날짜 사이 간격(며칠 차이인지)을 알려준다.
 */
function getGapDay(a: Date, b: Date): number {
  const day = Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil(day);
}

/**
 * @returns a,b 날짜 사이 간격(며칠 차이인지)을 알려준다.
 */
function getGapDayByString(start?: string | null, end?: string | null): number {
  if (!start || !end) {
    return 1;
  }

  const startDate = start ? new Date(start) : new Date();
  const endDate = end ? new Date(end) : new Date();
  return getGapDay(startDate, endDate);
}

export const DateUtil = {
  format,
  getGapDay,
  getGapDayByString,
};
