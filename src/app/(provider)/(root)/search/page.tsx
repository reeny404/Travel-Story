import ClientSearch from "./_components/ClientSearch";

function SearchPage() {
  return (
    // <section className="min-h-[calc(100vh - 52px)] bg-[#F8F8F8]">
    // 왜 위에건 안되고 아래건 되는지 아시는분 계신가요?ㅠㅠ
    <section
      style={{ minHeight: "calc(100vh - 52px)" }}
      className="bg-[#F8F8F8]"
    >
      <div className="flex flex-col p-5">
        <ClientSearch />
      </div>
    </section>
  );
}

export default SearchPage;
