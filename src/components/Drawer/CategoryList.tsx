import Category from "./Category";
import MyTripPlanner from "./MyTripPlanner";
import TripList from "./TripList";

function CategoryList() {
  return (
    <nav className="flex flex-col">
      <Category
        href="/"
        imgPath="/icons/home-black.png"
        alt="home"
        label="홈"
      />
      <Category
        href="/mypage"
        imgPath="/icons/home-black.png"
        alt="home"
        label="마이 페이지"
      />
      <Category
        imgPath="/icons/home-black.png"
        alt="home"
        label="내 여행 플래너"
        hasSubCategory
      >
        <MyTripPlanner />
      </Category>
      <Category
        imgPath="/icons/home-black.png"
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
