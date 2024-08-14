import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

type ContextType = {
  isShow: boolean;
  show: (Component?: ReactNode) => void;
  hide: () => void;
};

const OverlayContext = createContext<ContextType>({
  isShow: false,
  show: () => {},
  hide: () => {},
});

export const useOverlay = () => useContext(OverlayContext);

export function OverlayProvider({ children }: PropsWithChildren) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [popup, setPopup] = useState<ReactNode | null>(null);
  const show = (component?: ReactNode) => {
    setIsShow(true);
    setPopup(component);
  };

  const hide = () => {
    setIsShow(false);
    setPopup(null);
  };

  return (
    <OverlayContext.Provider value={{ isShow: !!popup, show, hide }}>
      {children}
      {isShow && (
        <>
          <div
            className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-30"
            onClick={hide}
          />
          {popup}
        </>
      )}
    </OverlayContext.Provider>
  );
}
