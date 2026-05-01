import React from "react";

const ErrorPage = () => {
  const MESSAGE = "404 - Page Not Found";

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

export default ErrorPage;
