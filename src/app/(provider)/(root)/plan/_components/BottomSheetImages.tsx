import { ImageUploader } from "@/components/ImageUploader";
import { BottomSheetType } from "@/types/plan";
import PlusIcon from "./PlusIcon";
import PhotoIcon from "./icons/PhotoIcon";

type BottomSheetImagesProps = BottomSheetType & {
  addImage: (urls: string) => void;
  images: string[];
};

function BottomSheetImages({ addImage, images, status }: BottomSheetImagesProps) {
  const bucket = { name: "plan", path: "schedule" };

  return (
    <div className="flex w-full">
      <i className="mr-2 w-8 text-center">
        <PhotoIcon className="mx-auto" />
      </i>
      <ul className="flex gap-2 flex-wrap">
        <li className="w-full">
          <ImageUploader
            addImage={addImage}
            bucket={bucket}
            images={images}
            readonly={status === "read"}
          >
            <label className="w-12 h-12 flex items-center justify-center bg-[#f5f5f5] rounded-xl cursor-pointer">
              <PlusIcon className="text-black" />
            </label>
          </ImageUploader>
        </li>
      </ul>
    </div>
  );
}

export default BottomSheetImages;
