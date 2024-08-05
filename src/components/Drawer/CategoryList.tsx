import { ICON } from "@/constants/icon";
import Category from "./Category";
import MyTripPlanner from "./MyTripPlanner";
import TripList from "./TripList";

function CategoryList() {
  return (
    <nav className="flex flex-col">
      <Category
        href="/"
        imgPath={`/drawer/${ICON.drawer.home}.png`}
        alt="home"
        label="홈"
      />
      <Category
        href="/my"
        imgPath={`/drawer/${ICON.drawer.mypage}.png`}
        alt="home"
        label="마이 페이지"
      />
      <Category
        imgPath={`/drawer/${ICON.drawer.planner}.png`}
        alt="home"
        label="내 여행 플래너"
        hasSubCategory
      >
        <MyTripPlanner />
      </Category>
      <Category
        imgPath={`/drawer/${ICON.drawer.tour}.png`}
        alt="home"
        label="여행지"
        hasSubCategory
      >
        <TripList />
      </Category>
    </nav>
  );
}

export default CategoryList;
