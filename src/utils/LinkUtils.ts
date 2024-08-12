const COUNTRY_AREA_LINK = (countryId: number, areaType: string) =>
  `/recommend/country/${countryId}/${areaType}`;
const CITY_AREA_LINK = (cityId: number, areaType: string) =>
  `/recommend/city/${cityId}/${areaType}`;
export const LinkUtils = {
  COUNTRY_AREA_LINK,
  CITY_AREA_LINK,
};
