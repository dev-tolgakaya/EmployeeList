import React from "react";
import Navbar from "../components/navbar";
import DataTable from "./dataTable";
import AddEdit from "./addEdit";
import { Route, Routes } from "react-router-dom";

function Content() {
  return (
    <div className="content">
      <Navbar />
      <Routes>
        <Route path="/addEdit"  element={<AddEdit />} />
        <Route path="/addEdit/:id" element={<AddEdit />} />
        <Route path="/" element={<DataTable />} />
      </Routes>
    </div>
  );
}

export default Content;
