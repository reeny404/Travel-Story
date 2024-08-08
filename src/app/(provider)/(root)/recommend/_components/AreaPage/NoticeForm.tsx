import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/icon";
import { Area } from "@/types/Recommend";
import TicketPrice from "./TicketPrice";

type NiticeFormProps = {
  area: Area;
};

function NoticeForm({ area }: NiticeFormProps) {
  const splitNotes = area?.info.notes!.split(".");

  return (
    <section className="px-4 py-8 w-full">
      <h1 className="text-lg font-medium mb-7 min-w-20">이용안내</h1>
      <article className="flex w-full pb-8">
        <div>
          <ImageFrame
            src={`/icons/${ICON.notice.white}.svg`}
            alt="notice"
            className="w-5 h-5"
          />
        </div>
        <div className="flex flex-col">
          {splitNotes.map((part, index) => (
            <p key={index} className="ml-3 w-72 leading-6">
              {part}
              {index < splitNotes.length - 1 && "."}
            </p>
          ))}
        </div>
      </article>
      <article className="flex w-full pb-3">
        <ImageFrame
          src={`/icons/${ICON.bill.white}.svg`}
          alt="euro"
          className="w-5 h-5"
        />
        {/* 추가 정보들 여기에 조건으로 달아서 출력 */}

        <div className="ml-3 w-72 leading-6">
          <TicketPrice
            ticket_price={area.info.ticket_price!}
            type={area.type!}
          />
        </div>
      </article>
    </section>
  );
}

export default NoticeForm;
