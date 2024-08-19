import { SupabaseMemoType, Todo } from "@/types/plan";
import CheckList from "./CheckList";
import CheckIcon from "./icons/CheckIcon";

type Props = {
  memo: SupabaseMemoType;
  isLast: boolean;
  planId: string;
  day: number;
};

function Memo({ memo, isLast, planId, day }: Props) {
  return (
    <>
      <div className="grid grid-flow-row grid-rows-schedule">
        <div className="w-7 h-7 mx-auto bg-black text-white rounded-full flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-white" />
        </div>
        {!isLast && <div className="w-[1px] bg-gray-300 mx-auto my-0" />}
      </div>
      <div className="flex-1 ml-5 box-border">
        <div className="w-full flex items-center justify-between mb-2">
          <h3 className="text-base font-bold pr-4">{memo.data.title}</h3>
        </div>
        <div className="w-full min-h-20 py-2 px-4 bg-white text-sm shadow-default rounded-lg mb-8">
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
