export const preventBodyScroll = (isPreventState: boolean) => {
  if (isPreventState) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};
