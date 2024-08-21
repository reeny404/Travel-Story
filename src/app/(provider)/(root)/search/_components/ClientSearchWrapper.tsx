"use client";

import LgHeader from '@/components/commons/Header/LgHeader';
import { useState } from "react";
import ClientSearch from "./ClientSearch"; // 기존 ClientSearch import

function ClientSearchWrapper() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <LgHeader onSearch={handleSearch} /> 
      <ClientSearch headerSearchTerm={searchTerm} />
    </>
  );
}

export default ClientSearchWrapper;
