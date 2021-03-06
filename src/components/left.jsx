import React, { Component } from "react";

const Left = ({ addLeft }) => {
  return (
    <button
      onClick={() => addLeft()}
      className="btn btn-secondary btn-sm m-2"
      style={{ float: "left" }}
    >
      Left
    </button>
  );
};

export default Left;
