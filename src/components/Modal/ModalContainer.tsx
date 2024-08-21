"use client";

import { useWindowSize } from "@/app/(provider)/(root)/_hook/useWindowSize";
import clsx from "clsx";
import { ReactNode } from "react";
import SvgIcon from "../commons/SvgIcon";

type ModalContainerProps = {
  onClose: () => void;
  children: ReactNode;
};

const ModalContainer = ({ onClose, children }: ModalContainerProps) => {
  const { width } = useWindowSize();

  return (
    <>
      {width > 0 ? (
        <aside
          className={clsx(
            "fixed bg-white shadow-drawer z-drawer rounded-lg p-6",
            {
              "top-[100px] left-[calc(50%-330px)] max-w-[600px] w-full":
                width >= 768,
              "top-0 w-full h-full": width < 768,
            }
          )}
        >
          <header className="flex justify-end items-center px-4">
            <button
              className="flex justify-end items-center w-11 h-11"
              type="button"
            >
              <SvgIcon
                name="x"
                width={20}
                height={20}
                title="cancel"
                onClick={onClose}
                className="cursor-pointer"
              />
            </button>
          </header>

          <section className="flex flex-col justify-start items-start w-full h-[calc(100%-3rem)]">
            {children}
          </section>
        </aside>
      ) : null}
    </>
  );
};

export default ModalContainer;
