import FooterList from "./FooterList";
import MyMenu from "./MyMenu";
import MyProfile from "./MyProfile";
import MySchedule from "./MySchedule";
import RecentView from "./RecentView";

function MyPageSection() {
  return (
    <main className="flex flex-col w-full px-5 bg-[#F5F5F5]">
      <MyProfile />
      <MySchedule />
      <section className="w-full p-[10px] my-[18px] bg-[#D2E8FF] rounded-lg">
        공지사항
      </section>
      <MyMenu />
      <RecentView />
      <FooterList />
    </main>
  );
}

export default MyPageSection;
