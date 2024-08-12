"use client";
import { ImgFileType } from "@/types/Recommend";
import clsx from "clsx";
import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlusIcon from "./PlusIcon";

type BottomSheetImagesProps = {
  imgFile: ImgFileType[];
  setImgFile: Dispatch<React.SetStateAction<ImgFileType[]>>;
  initializeImages?: boolean; // 이 옵션을 통해 useEffect를 실행할지 결정
};

function BottomSheetImages({
  imgFile,
  setImgFile,
  initializeImages = false,
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
    const extension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${extension}`;
    const imageFileToServer = { name: fileName, file: file };
    setImgFile((prev) => [...prev, imageFileToServer]);
  };

  const handleDelete = (
    images: string[],
    imgFile: ImgFileType[],
    index: number
  ) => {
    const deletedImages = images.filter((img, idx) => index !== idx);
    const deletedImageFiles = imgFile.filter((img, idx) => index !== idx);

    setImages(deletedImages);
    setImgFile(deletedImageFiles);
  };

  useEffect(() => {
    if (initializeImages) {
      imgFile.forEach((file) => {
        if (typeof file === "string" && !images.includes(file)) {
          setImages((prev) => [...prev, file]);
        }
      });
    }
  }, [imgFile, initializeImages]);

  return (
    <div className="flex w-full">
      <ul className="flex gap-3 flex-wrap">
        {images.map((imageSrc, index) => (
          <li
            key={index}
            onClick={() => {
              handleDelete(images, imgFile, index);
            }}
            className="relative w-12 h-12 text-gray-300 flex items-center justify-center bg-neutral-150 rounded-lg aspect-square"
          >
            <Image
              src={imageSrc}
              alt={`선택 이미지 ${index}`}
              fill
              className="object-cover rounded-lg"
            />
          </li>
        ))}

        <li
          className={clsx(
            `h-12 flex items-center justify-center bg-neutral-150 rounded-lg`,
            {
              "w-12": images.length > 0,
            }
          )}
        >
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex px-4 gap-x-2 "
          >
            {images.length === 0 && <p>사진 추가</p>} <PlusIcon />
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

export default BottomSheetImages;
