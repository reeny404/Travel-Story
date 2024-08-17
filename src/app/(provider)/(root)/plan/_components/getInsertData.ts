import {
  Memo,
  MoveSchedule,
  PlanChildData,
  PlanChildType,
  Schedule,
} from "@/types/plan";

export function getUpdateData(
  type: PlanChildType,
  data: Record<string, any>,
  planId: string,
  checkList?: any): PlanChildData & { id: string } | null {
  const newData = getInsertData(type, data, planId, checkList);
  return newData ? { ...newData, id: data.id } : null;
}

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
  if (type === "customPlace") {
    const insertData = {
      title: data.title,
      memo: data.memo,
      startTime: data.startTime,
      endTime: data.endTime,
      place: data.place,
      imagesUrl: data.images ?? [],
    } as Schedule;

    if (isExcepTime) {
      delete insertData.startTime;
      delete insertData.endTime;
    }

    return insertData;
  }

  return null;
}
