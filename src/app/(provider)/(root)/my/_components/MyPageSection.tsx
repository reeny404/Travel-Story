import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";

function MyPageSection() {
  return (
    <main
      className="flex flex-col w-full px-5 pt-12 bg-neutral-100"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      <MyProfile />
      <MySchedule />
      <MyMenu />
      <section className="w-full p-[10px] mt-10 text-white bg-neutral-650 rounded-lg">
        [공지] 공지사항
      </section>
      <FooterList />
    </main>
  );
}

export default MyPageSection;
