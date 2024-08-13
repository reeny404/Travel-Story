import MainLayout from "@/components/Layout/MainLayout";
import { Suspense } from "react";
import ClientSearch from "./_components/ClientSearch";

function SearchPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "어디로 떠나시나요",
      }}
    >
      <section style={{ minHeight: "calc(100vh - 52px)" }}>
        <div className="flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <ClientSearch />
          </Suspense>
        </div>
      </section>
    </MainLayout>
  );
}

export default SearchPage;
