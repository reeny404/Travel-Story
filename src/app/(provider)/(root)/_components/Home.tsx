"use client";

import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import ArchCardSlider from "@/components/Slider/ArchCardSlider";
import { ICON } from "@/constants/icon";
import { useAuth } from "@/contexts/auth.contexts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetData from "../_hook/useGetData";
import Footer from "./Footer";
import LeftCardSection from "./LeftCardSection";
import MyTrip from "./MyTrip";
import RightCardSection from "./RightCardSection";

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const cardData = useGetData();
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
        ],
      }}
    >
      <main
        className="relative w-full bg-gray"
        style={{ minHeight: "calc(100vh - 52px)" }}
      >
        <div className="relative w-full h-[222px] bg-slate-200">
          <Link href="/recommend/country/1/detail">
            <Image
              src="/banners/banner1_x3.png"
              alt="banner"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div className="sticky z-10 -mt-[15px] px-4">
          <div className="flex justify-center w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <MyTrip />
        <div className="mt-7">
          <CardType title="인기 여행지" type="fire" />
          <ArchCardSlider spacing={12} slidesPerView={3.8} />
        </div>
        <RightCardSection
          title="Tourist spot"
          subTitle="그 나라만의 특별한 여행지"
          textColor="black"
          theme="bg-lime-300"
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
        <RightCardSection
          title="Restaruant"
          subTitle="여행지에는 어떤 맛집이 있을까?"
          theme="bg-danger-400"
          krCategory="식당"
          cardData={cardData.restaurant}
        />
        <LeftCardSection
          title="Shopping"
          subTitle="여행지의 추억을 불러일으키는 기념품"
          theme="bg-purple-400"
          krCategory="관광지"
          cardData={cardData.shop}
        />
        <Footer />
      </main>
    </MainLayout>
  );
}

export default Home;
