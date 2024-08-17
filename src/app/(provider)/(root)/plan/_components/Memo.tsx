import { SupabaseMemoType, Todo } from "@/types/plan";
import CheckList from "./CheckList";
import CheckIcon from "./icons/CheckIcon";
import Line from "./Line";

type Props = {
  memo: SupabaseMemoType;
  isLast: boolean;
  planId: string;
  day: number;
};

function Memo({ memo, isLast, planId, day }: Props) {
  return (
    <>
      <div className="w-1/12 min-h-44 mr-[3%] flex flex-col h-full">
        <div className="w-7 h-7 mx-auto bg-black text-white rounded-full flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-white" />
        </div>
        <Line hide={isLast} />
      </div>
      <div className="w-11/12 min-h-44">
        <div className="w-full flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-ellipsis text-nowrap overflow-hidden">
            {memo.data.title}
          </h3>
        </div>
        <div className="w-full min-h-20 py-2 px-4 bg-white text-sm shadow-schecule-list rounded-lg">
          <CheckList
            planId={planId}
            day={day}
            memoId={memo.id}
            checkList={memo.data.check as Todo[]}
          />
        </div>
      </div>
    </>
  );
}

export default Memo;
