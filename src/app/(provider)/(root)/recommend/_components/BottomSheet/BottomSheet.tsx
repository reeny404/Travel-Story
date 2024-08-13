import clsx from "clsx";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type BottomSheetProps = {
  onClose: () => void;
  children: React.ReactNode;
  height: string;
};

export function BottomSheet({
  onClose,
  children,
  height,
}: PropsWithChildren<BottomSheetProps>) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsOpening(true);
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300);
      }
    },
    [onClose]
  );

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full z-bottomSheet bg-black transition-opacity duration-300",
        {
          "bg-opacity-0": isOpening,
          "bg-opacity-50": !isOpening,
        }
      )}
      onClick={handleClose}
    >
      <form
        ref={formRef}
        className={clsx(
          "absolute bottom-0 left-0 w-full pt-7 rounded-t-3xl shadow-bottom-sheet bg-white transition-transform duration-300",
          {
            "translate-y-full": isClosing || isOpening,
            "translate-y-0": !isClosing && !isOpening,
          }
        )}
        style={{ height }}
      >
        {children}
      </form>
    </div>
  );
}
