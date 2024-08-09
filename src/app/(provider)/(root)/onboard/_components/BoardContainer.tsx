import { PropsWithChildren } from "react";
type BoardType = {
  title: string;
};
function BoardContainer({ title, children }: PropsWithChildren<BoardType>) {
  return (
    <main
      className="relative flex flex-col items-center w-full px-4 bg-blue-100 pt-14"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      <h1 className="w-full mb-16 text-[28px] font-semibold leading-9 whitespace-pre-wrap">
        {title}
      </h1>
      {children}
      <button className="absolute bottom-5 w-[343px] h-11 rounded-lg bg-neutral-750 text-white">
        다음으로
      </button>
    </main>
  );
}

export default BoardContainer;
