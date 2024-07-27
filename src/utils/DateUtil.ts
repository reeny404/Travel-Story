type formatType = "yyyy. MM. dd" | "yyyy년 MM월 dd일"

const DAY = ["일", "월", "화", "수", "목", "금", "토"];

function parse(type: formatType, time: Date) {
  if (!time) {
    return "";
  }

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = DAY[time.getDay()];

  switch (type) {
    case "yyyy. MM. dd": return `${year}. ${month}. ${date} (${day})`
    case "yyyy년 MM월 dd일": return `${year}년 ${month}월 ${date}일 (${day})`
    default: return "";
  }
}

export const DateUtil = {
  parse
}