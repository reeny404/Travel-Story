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
      <h1 className="font-bold my-5 min-w-20">이용안내</h1>
      <div className="flex w-full">
        <ImageFrame
          src={`/icons/${ICON.notice.white}.png`}
          alt="notice"
          className="w-5 h-5"
        />
        <div>
          {splitNotes.map((part, index) => (
            <p key={index} className="ml-5 w-72 text-sm">
              {part}
              {index < splitNotes.length - 1 && "."}
            </p>
          ))}
        </div>
      </div>
      {area.info.ticket_price && (
        <div className="flex w-full mt-5">
          <ImageFrame
            src={`/icons/${ICON.credit.euro}.png`}
            alt="euro"
            className="w-5 h-5"
          />
          {/* 추가 정보들 여기에 조건으로 달아서 출력 */}

          <div className="ml-5 w-72 text-sm">
            <TicketPrice
              ticket_price={area.info.ticket_price}
              type={area.type!}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default NoticeForm;
