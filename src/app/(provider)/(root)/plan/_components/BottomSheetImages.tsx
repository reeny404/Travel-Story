"use client";
import { BottomSheetType } from "@/types/plan";
import Image from "next/image";
import React, { useState } from "react";
import PlusIcon from "./PlusIcon";

function BottomSheetImages({ type, status }: BottomSheetType) {
  const [images, setImages] = useState<string[]>([]);

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
      <i className="mr-2 w-8 text-center">✔</i>
      <ul className="flex gap-2">
        {images.map((imageSrc, index) => (
          <li
            key={index}
            className="w-12 h-12 text-gray-300 flex items-center justify-center bg-gray-300 overflow-hidden"
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
          <li className="flex items-center w-12 h-12 text-gray-300 overflow-hidden">
            <input
              type="file"
              className="hidden"
              id="imageUpload"
              onChange={handleImageUpload}
              multiple
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <PlusIcon className="text-gray-300 ml-1" />
            </label>
          </li>
        )}
      </ul>
    </div>
  );
}

export default BottomSheetImages;
