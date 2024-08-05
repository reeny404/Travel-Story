type formatType = "yyyy. MM. dd (E)" | "yyyy년 MM월 dd일 (E)" | "yyyy년 MM월 dd일";

const DAY = ["일", "월", "화", "수", "목", "금", "토"];

/**
 * @returns Date 타입을 포맷에 맞는 날짜 규격으로 내려준다.
 */
function format(type: formatType, time: Date): string {
  if (!time) {
    return "";
  }

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = DAY[time.getDay()];

  switch (type) {
    case "yyyy. MM. dd (E)":
      return `${year}. ${month}. ${date} (${day})`;
    case "yyyy년 MM월 dd일 (E)":
      return `${year}년 ${month}월 ${date}일 (${day})`;
    case "yyyy년 MM월 dd일":
      return `${year}년 ${month}월 ${date}일`;
    default:
      return "";
  }
}

/**
 * @returns a,b 날짜 사이 간격(며칠 차이인지)을 알려준다.
 */
function getGapDay(a: Date, b: Date): number {
  const day = Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil(day);
}

export const DateUtil = {
  format,
  getGapDay,
};
