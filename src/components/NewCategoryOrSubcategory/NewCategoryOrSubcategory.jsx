import React from "react";
import NewCategory from "./NewCategory/NewCategory";
import NewSubcategory from "./NewSubcategory/NewSubcategory";
import { FaArrowLeft } from "react-icons/fa";

export default function NewCategoryOrSubcategory() {
  return (
    <div className="container" style={{marginBottom: '10vh'}}>
      <br />
      <a className="btn btn-success" href="/dashboard" style={{ marginBottom: "3vh" }}><FaArrowLeft/></a>
      <NewCategory />
      <hr />
      <NewSubcategory />
    </div>
  );
}
