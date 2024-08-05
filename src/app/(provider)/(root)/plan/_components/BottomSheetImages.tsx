"use client";
import { BottomSheetType } from "@/types/plan";
import Image from "next/image";
import React from "react";
import PlusIcon from "./PlusIcon";
import PhotoIcon from "./icons/PhotoIcon";

type BottomSheetImagesProps = BottomSheetType & {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

function BottomSheetImages({
  type,
  status,
  images,
  setImages,
}: BottomSheetImagesProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(fileArray));
    }
  };

  return (
    <div className="flex w-full">
      <i className="mr-2 w-8 text-center">
        <PhotoIcon className="mx-auto" />
      </i>
      <ul className="flex gap-2 flex-wrap">
        {images.map((imageSrc, index) => (
          <li
            key={index}
            className="w-12 h-12 text-gray-300 flex items-center justify-center bg-gray-300 overflow-hidden rounded-xl"
          >
            <Image
              src={imageSrc}
              alt={`선택 이미지 ${index}`}
              width={48}
              height={48}
              className="object-cover"
            />
          </li>
        ))}
        {status !== "read" && (
          <li className="w-12 h-12 flex items-center justify-center bg-[#f5f5f5] rounded-xl">
            <label htmlFor="image-upload" className="cursor-pointer">
              <PlusIcon classNmae="text-black" />
            </label>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default BottomSheetImages;
