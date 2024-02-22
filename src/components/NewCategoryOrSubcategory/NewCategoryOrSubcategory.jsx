import React from "react";
import NewCategory from "./NewCategory/NewCategory";
import NewSubcategory from "./NewSubcategory/NewSubcategory";

export default function NewCategoryOrSubcategory() {
  return (
    <div className="container" style={{marginBottom: '10vh'}}>
      <br />
      <a className="btn btn-success" href="/dashboard" style={{ marginBottom: "3vh" }}>Volver al Panel</a>
      <NewCategory />
      <hr />
      <NewSubcategory />
    </div>
  );
}
