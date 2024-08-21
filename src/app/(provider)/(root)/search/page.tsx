import MainLayout from "@/components/Layout/MainLayout";
import { Suspense } from "react";
import ClientSearchWrapper from "./_components/ClientSearchWrapper";

function SearchPage() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "어디로 떠나시나요?",
      }}
      noHeader
    >
      <section className="min-h-[calc(100vh-52px)] md:h-full">
        <div className="flex flex-col">
          <Suspense>
            <ClientSearchWrapper />
          </Suspense>
        </div>
      </section>
    </MainLayout>
  );
}

export default SearchPage;
