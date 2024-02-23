import React from "react";
import ConfigureCategories from "./ConfigureCategories/ConfigureCategories";
import ConfigureSubcategories from "./ConfigureSubcategories/ConfigureSubcategories";
import ConfigureProducts from "./ConfigureProducts/ConfigureProducts";
import { FaArrowLeft } from "react-icons/fa";

export default function ManageStock() {
  return (
    <div className="container" style={{marginTop: "10vh"}}>
      <a className="btn btn-warning" href="/dashboard" style={{ marginBottom: "3vh" }}><FaArrowLeft/></a>
      <ConfigureCategories />
      <hr />
      <ConfigureSubcategories />
      <hr />
      <ConfigureProducts />
    </div>
  );
}
