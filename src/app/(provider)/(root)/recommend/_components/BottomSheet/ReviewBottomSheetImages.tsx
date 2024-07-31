"use client";
import Image from "next/image";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlusIcon from "./PlusIcon";

type BottomSheetImagesProps = {
  imgFile: { name: string; file: File }[];
  setImgFile: React.Dispatch<
    React.SetStateAction<{ name: string; file: File }[]>
  >;
};

function ReviewBottomSheetImages({
  imgFile,
  setImgFile,
}: BottomSheetImagesProps) {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(fileArray));
    }
    if (!files || files.length === 0) return;
    const file = files[0];
    console.log("file", file);
    const extension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${extension}`;
    const imageFileToServer = { name: fileName, file: file };
    setImgFile((prev) => [...prev, imageFileToServer]);
  };
  console.log("first", imgFile);
  return (
    <div className="flex w-full">
      <i className="mr-2 w-8 text-center">🖼</i>
      <ul className="flex gap-2 flex-wrap">
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

        <li className="w-12 h-12 flex items-center justify-center bg-gray-300">
          <label
            htmlFor="image-upload"
            className="cursor-pointer text-gray-500"
          >
            <PlusIcon />
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
      </ul>
    </div>
  );
}

export default ReviewBottomSheetImages;
