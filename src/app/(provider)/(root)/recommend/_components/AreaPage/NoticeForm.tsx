import ImageFrame from "@/components/Frame/ImageFrame";
import { ICON } from "@/constants/Icon";
import { Area } from "@/types/Recommend";
import { splitText } from "@/utils/splitText";

function NoticeForm({ area }: { area: Area }) {
  const splitNotes = splitText(area?.info.notes!, ".");

  return (
    <section className="p-3 w-full">
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
      <div className="flex w-full mt-5">
        <ImageFrame
          src={`/icons/${ICON.credit.euro}.png`}
          alt="euro"
          className="w-5 h-5"
        />
        {/* 추가 정보들 여기에 조건으로 달아서 출력 */}
        {area.info.ticket_price && (
          <div className="ml-5 w-72 text-sm">
            <p>성인 {area.info.ticket_price?.adult}</p>
            <p>청년 {area.info.ticket_price?.youth}</p>
            <p>어린이 {area.info.ticket_price?.child}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NoticeForm;
