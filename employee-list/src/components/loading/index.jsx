import React from "react";
import "./Loading.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const loading = useSelector((state) => state.runtime.loading);
  return (
    loading && (
      <div className={"load-back"}>
        <div className={"load-container"}>
          <button className={"load-btn"}></button>
          Loading...
        </div>
      </div>
    )
  );
};

export default Index;
