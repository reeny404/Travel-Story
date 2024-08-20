"use client";

import Image from "next/image";
import {
  ChangeEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import { upload } from "./upload";

type Props = {
  addImage: (urls: string) => void;
  images?: string[];
  bucket: { name: string; path: string };
  readonly: boolean;
} & PropsWithChildren;

export function ImageUploader({
  children,
  images = [],
  addImage,
  bucket,
  readonly,
}: Props) {
  const refImageInput = useRef<HTMLInputElement | null>(null);
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    refImageInput.current?.click();
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: FileList | null = e.currentTarget.files;
    if (!files || files.length === 0) {
      return;
    }

    upload(files[0], bucket)
      .then(async (url) => {
        addImage(url);
      })
      .catch(() => alert("이미지 업로드 실패"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  images = images ?? [];

  return (
    <div className="flex items-end gap-x-5">
      {images.map((image, i) => (
        <div key={i} className="relative w-12 h-12 aspect-auto">
          <Image
            src={image}
            alt="uploadedImage"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={refImageInput}
        className="hidden"
      />
      {!readonly && <div onClick={handleClick}>{children}</div>}
    </div>
  );
}
