import React, { Component } from "react";

const Right = ({ addRight }) => {
  return (
    <button
      onClick={() => addRight()}
      className="btn btn-secondary btn-sm m-2"
    >
      Right
    </button>
  );
};

export default Right;
