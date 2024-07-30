import { ICON } from "@/constants/Icon";
import Category from "./Category";
import MyTripPlanner from "./MyTripPlanner";
import TripList from "./TripList";

function CategoryList() {
  return (
    <nav className="flex flex-col">
      <Category
        href="/"
        imgPath={`/icons/${ICON.home.black}.png`}
        alt="home"
        label="홈"
      />
      <Category
        href="/my-page"
        imgPath={`/icons/${ICON.home.black}.png`}
        alt="home"
        label="마이 페이지"
      />
      <Category
        imgPath={`/icons/${ICON.home.black}.png`}
        alt="home"
        label="내 여행 플래너"
        hasSubCategory
      >
        <MyTripPlanner />
      </Category>
      <Category
        imgPath={`/icons/${ICON.home.black}.png`}
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
