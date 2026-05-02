import React from "react";

const LoadingPage = ({ MESSAGE = "Loading..." }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "36px" }}>{MESSAGE}</h1>
    </div>
  );
};

export default LoadingPage;
