import Link from "next/link";

const PlANNERITEMS = [
  { name: "내 여행", path: "#" },
  { name: "내 여행 리스트", path: "#" },
  { name: "가계부", path: "/account" },
];

function MyTripPlanner() {
  return (
    <ul className="flex flex-col gap-3 ml-12 mb-4">
      {PlANNERITEMS.map((item, index) => (
        <li key={index} className="flex items-center h-10">
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default MyTripPlanner;
