import { api } from "@/apis/api";
import { extendArea } from "@/types/Recommend";
import { SlideCardProps } from "@/types/Slider";
import { getRandomTags } from "@/utils/getRandomTags";
import { useEffect, useState } from "react";

const useGetData = () => {
  const [data, setData] = useState<{ [key: string]: SlideCardProps[] }>({
    place: [],
    restaurant: [],
    shop: [],
    accommodation: [],
  });

  useEffect(() => {
    const getCardData = async () => {
      try {
        const response: any = await api.area.getAreasByCategory();

        if (!response) {
          console.error("Response Data를 가져오지 못하였습니다.", response);
          return;
        }

        const reDefineData: { [key: string]: SlideCardProps[] } = Object.keys(
          response
        ).reduce(
          (acc, key) => {
            acc[key] = response[key].map((area: extendArea) => ({
              title: area.name || "",
              description: area.description || "",
              imageUrl: area.imageUrl,
              linkUrl: `/recommend/area/${area.id}` || "",
              tags: area.tags ? area.tags : getRandomTags(),
              id: area.id,
              city: area.city?.krName || "",
              country: area.country?.krName || "",
              areaName: area.krName || area.name,
              type: area.type || "",
            }));
            return acc;
          },
          {} as { [key: string]: SlideCardProps[] }
        );

        setData(reDefineData);
      } catch (error) {
        console.error("Failed to get data", error);
      }
    };

    getCardData();
  }, []);

  return data;
};

export default useGetData;
