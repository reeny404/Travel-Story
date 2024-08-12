import MainLayout from "@/components/Layout/MainLayout";
import ClientSearch from "./_components/ClientSearch"; // 일반적으로 임포트

function SearchPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "어디로 떠나시나요?",
      }}
    >
      <section className="min-h-[calc(100vh-52px)]">
        <div className="flex flex-col">
          <ClientSearch />
        </div>
      </section>
    </MainLayout>
  );
}

export default SearchPage;
