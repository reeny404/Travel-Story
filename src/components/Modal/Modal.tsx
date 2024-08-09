"use client";
import { useModalStore } from "@/stores/modal.store";
import { useRouter } from "next/navigation";

function Modal() {
  const { isOpen, title, content, closeModal } = useModalStore();
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <article className="relative bg-white px-7 py-8 border border-gray-300 rounded-lg shadow-lg max-w-md w-full z-10">
        {/* <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1> */}
        <p className="text-neutral-750 mb-10 text-center text-lg px-10">
          {content}
        </p>
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="w-1/2 h-10 text-gray-800 py-2 border-[0.6px] border-neutral-600 rounded mr-2"
          >
            취소
          </button>
          <button
            onClick={() => {
              closeModal(), router.push("/login");
            }}
            className="w-1/2 h-10 bg-neutral-750 text-white py-2 rounded"
          >
            로그인하기
          </button>
        </div>
      </article>
    </div>
  );
}

export default Modal;
