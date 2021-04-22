import React, { useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

function FakeSheet() {
  return (
      <div>
        <section className="header">
          <Header />
        </section>
        <section className="spreadsheet">
          <Table />
        </section>
      </div>
  );
}

export default FakeSheet;
