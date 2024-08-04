import ClientSearch from "./_components/ClientSearch";

function SearchPage() {
  return (
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
