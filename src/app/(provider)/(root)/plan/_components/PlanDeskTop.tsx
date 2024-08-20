import Image from "next/image";

function PlanDeskTop() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Travel Story</h1>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-700">
              여행지
            </a>
            <a href="#" className="text-gray-700">
              내 여행 플래너
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="프랑스 오르세 미술관"
            className="px-4 py-2 border rounded"
          />
          <button className="px-4 py-2 text-white bg-primary rounded">
            검색
          </button>
        </div>
      </header>
      <div className="relative">
        <Image
          src="/placeholder.svg"
          alt="Travel Image"
          className="w-full h-64 object-cover"
          width="1200"
          height="300"
          style={{ aspectRatio: "1200/300", objectFit: "cover" }}
        />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p>2024 0718 - 0724</p>
        </div>
      </div>
      <div className="flex justify-between p-4 bg-white shadow">
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700">밀라노 여행기</button>
          <button className="px-4 py-2 text-gray-700">지도 보기</button>
          <button className="px-4 py-2 text-gray-700">스케줄 편집</button>
          <button className="px-4 py-2 text-gray-700">이미지로 저장</button>
          <button className="px-4 py-2 text-gray-700">내 여행 일지</button>
        </div>
        <div className="flex space-x-2">아바타</div>
      </div>
      <div className="flex justify-center p-4 space-x-4 bg-white shadow">
        <button className="px-4 py-2 text-gray-700">1일차</button>
        <button className="px-4 py-2 text-gray-700">2일차</button>
        <button className="px-4 py-2 text-gray-700">3일차</button>
        <button className="px-4 py-2 text-gray-700">4일차</button>
        <button className="px-4 py-2 text-gray-700">5일차</button>
        <button className="px-4 py-2 text-gray-700">+ 여행일 추가</button>
      </div>
      <div className="flex justify-center p-4 space-x-4">
        <div className="w-1/4 bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">라 카페테 어 몬티</h2>
            <span className="text-gray-500">10:00 - 12:30</span>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Activity Image"
            className="w-full h-32 object-cover mt-2"
            width="200"
            height="100"
            style={{ aspectRatio: "200/100", objectFit: "cover" }}
          />
          <p className="mt-2">콜로세움 근처</p>
          <div className="mt-4">
            <h3 className="text-md font-semibold">To do</h3>
            <ul className="list-disc list-inside">
              <li>양수장 사진 찍어서 기록하기</li>
              <li>부채 사기</li>
              <li>소독제 사기</li>
            </ul>
          </div>
        </div>
        <div className="w-1/4 bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">버스 103</h2>
            <span className="text-gray-500">1시간 30분</span>
          </div>
        </div>
        <div className="w-1/4 bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">피사의 사탑</h2>
            <span className="text-gray-500">10:00 - 12:30</span>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Activity Image"
            className="w-full h-32 object-cover mt-2"
            width="200"
            height="100"
            style={{ aspectRatio: "200/100", objectFit: "cover" }}
          />
          <p className="mt-2">콜로세움 근처</p>
        </div>
      </div>
      <footer className="flex justify-center p-4 bg-gray-200">
        <p>©2024. Tripstory all rights reserved.</p>
      </footer>
    </div>
  );
}

export default PlanDeskTop;
