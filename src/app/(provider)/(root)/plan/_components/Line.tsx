function Line({ hide }: { hide?: boolean }) {
  if (hide) {
    return "";
  }
  return <div className="w-[1px] flex-1 bg-gray-300 mx-auto" />;
}

export default Line;
