import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";

function MyPageSection() {
  return (
    <main
      className="flex flex-col w-full px-7 bg-[#F5F5F5]"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      <MyProfile />
      <MySchedule />
      <section className="w-full p-[10px] my-[18px] bg-[#D2E8FF] rounded-lg">
        공지사항
      </section>
      <MyMenu />
      <FooterList />
    </main>
  );
}

export default MyPageSection;
