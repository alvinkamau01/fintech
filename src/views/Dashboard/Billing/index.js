import React from "react";
import ClientsTable from "./components/clientsTable";

const Billing = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "40px",marginTop:"80px"}}>
      <ClientsTable />
    </div>
  );
};

export default Billing;
