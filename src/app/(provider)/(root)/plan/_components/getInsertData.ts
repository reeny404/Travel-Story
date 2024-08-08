import { Memo, MoveSchedule, PlanChildData, PlanChildType, Schedule } from "@/types/plan";

export function getInsertData(
  type: PlanChildType,
  data: Record<string, any>,
  planId: string,
  checkList?: any
): PlanChildData | null {
  const { startTime, endTime } = data;
  const isExcepTime: boolean = !startTime || !endTime;

  if (type === "memo") {
    return {
      title: data.title,
      planId: planId,
      content: data.content,
      check: checkList,
    } as Memo;
  }

  if (type === "move") {
    const insertData = {
      type: data.title,
      memo: data.contents,
      imagesUrl: data.images ?? [],
      planId: planId,
      startTime: data.startTime,
      endTime: data.endTime,
    } as MoveSchedule;

    if (isExcepTime) {
      delete insertData.startTime;
      delete insertData.endTime;
    }

    return insertData;
  }
  if (type === "customePlace") {
    const insertData = {
      title: data.title,
      memo: data.memo,
      startTime: data.startTime,
      endTime: data.endTime,
      place: data.place
    } as Schedule;

    if (isExcepTime) {
      delete insertData.startTime;
      delete insertData.endTime;
    }

    return insertData;
  }

  return null;
}
