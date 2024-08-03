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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <article className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-md w-full z-10">
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-gray-700 mb-6 text-center">{content}</p>
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            로그인하기
          </button>
        </div>
      </article>
    </div>
  );
}

export default Modal;
