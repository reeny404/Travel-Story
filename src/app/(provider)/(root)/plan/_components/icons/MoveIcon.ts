import { MoveType } from "@/types/plan";
import AirplaneIcon from "./AirplaneIcon";
import BicycleIcon from "./BicycleIcon";
import CarIcon from "./CarIcon";
import PublicTransportIcon from "./PublicTransportIcon";
import ShipIcon from "./ShipIcon";
import WalkingIcon from "./WalkingIcon";

export const MOVE_ICONS: Record<MoveType, React.FC> = {
  "도보": WalkingIcon,
  "자전거": BicycleIcon,
  "렌트카": CarIcon,
  "대중교통": PublicTransportIcon,
  "선박": ShipIcon,
  "항공": AirplaneIcon,
}