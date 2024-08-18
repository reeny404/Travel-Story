import { PropsWithChildren } from "react";

function SearchModal(children: PropsWithChildren) {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <article className="max-w-[600px] w-full px-4 pt-4 pb-10 bg-white rounded-lg shadow-default z-modal"></article>
    </>
  );
}

export default SearchModal;
