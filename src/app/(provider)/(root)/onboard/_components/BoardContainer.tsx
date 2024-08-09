import { PropsWithChildren } from "react";
type BoardType = {
  title: string;
};
function BoardContainer({ title, children }: PropsWithChildren<BoardType>) {
  return (
    <main>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export default BoardContainer;
