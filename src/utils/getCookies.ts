import { NextRequest } from "next/server";

//cookies에서 값 확인하는 함수
export const getCookies = (request: NextRequest, key: string) => {
  return request.cookies.get(key);
};
