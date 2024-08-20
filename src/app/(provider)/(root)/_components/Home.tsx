"use client";

import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetData from "../_hook/useGetData";
import { useWindowSize } from "../_hook/useWindowSize";
import Footer from "./Footer";
import HomeBanner from "./HomeBanner";
import LeftCardSection from "./LeftCardSection";
import MyTrip from "./MyTrip";
import RightCardSection from "./RightCardSection";

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const cardData = useGetData();
  const { width } = useWindowSize();

  // 중간발표 이후 추가기능 부분
  // const {
  //   data: popularCountries,
  //   isPending,
  //   error,
  // } = useQuery<RecommendResponse<Country[]>, AxiosError>({
  //   queryKey: ["popularCountries"],
  //   queryFn: () => api.country.getCountries(),
  //   staleTime: 1000 * 60 * 3,
  // });

  const handleAvatarClick = () => {
    if (user) {
      return router.push("/my");
    }
    return router.push("/login");
  };

  const handleSearch = (term: string) => {
    router.push(`/search?query=${term}`);
  };

  const handleMoveSearch = () => {
    router.push(`/search`);
  };

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "TravelStory",
        titleAlign: "left" as const,
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: handleMoveSearch,
          },
          {
            icon: ICON.avatar.black,
            alt: "Mypage",
            size: 20,
            onClick: handleAvatarClick,
          },
        ],
      }}
    >
      <main className="relative w-full min-h-[calc(100vh-52px)] bg-gray">
        <HomeBanner />

        {width > 0 && width < 768 ? (
          <>
            <div className="sticky z-10 -mt-[15px] px-4">
              <div className="relative flex justify-center w-full">
                <Link
                  className="absolute inset-y-0 left-4 right-0 w-11/12 h-full rounded-lg z-20 cursor-pointer"
                  href="/search"
                />
                <SearchBar onSearch={handleSearch} isDisabled={true} />
              </div>
            </div>

            <MyTrip />
          </>
        ) : null}
        <section className="mt-7">
          <CardType title="인기 여행지" type="fire" />
          <ArchCardSlider />
        </section>
        <RightCardSection
          textColor="primary"
          krCategory="관광지"
          cardData={cardData.place}
        />
        <LeftCardSection
          title="Hotel"
          subTitle="관광지 근처의 숙소를 구경해보세요!"
          theme="bg-info-500"
          krCategory="숙소"
          cardData={cardData.accommodation}
        />
        <RightCardSection krCategory="식당" cardData={cardData.restaurant} />
        <LeftCardSection
          title="Shopping"
          subTitle="여행지의 추억을 불러일으키는 기념품"
          theme="bg-purple-400"
          krCategory="쇼핑"
          cardData={cardData.shop}
        />
        <Footer />
      </main>
    </MainLayout>
  );
}

export default Home;
