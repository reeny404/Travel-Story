import React, { PropsWithChildren, useCallback, useRef } from "react";

type ReviewModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export function ReviewModal({
  onClose,
  children,
}: PropsWithChildren<ReviewModalProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className="bg-white p-8 pb-10 rounded-lg shadow-lg w-full md:max-w-[700px] lg:max-w-[1016px] h-[708px] mx-auto"
      >
        {children}
      </form>
    </div>
  );
}
