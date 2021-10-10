import React from "react";
import { BuildingsTable } from "./buildings-table";
import { LandAreaTables } from "./land-area-table";

import "./product-mix.css";

export const ProductMixPage: React.FC = () => {
  return (
    <div className="page">
      <h1>Product Mix</h1>
      <LandAreaTables />
      <div className="detailed-tables-container">
        <BuildingsTable />
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
