import React, { Component } from "react";

const AddRow = ({ handleAddRows }) => {
  return (
    <div style={{ float: "left" }}>
      <button
        onClick={() => handleAddRows()}
        className="btn btn-secondary btn-sm m-2"
      >
        Add Row
      </button>
    </div>
  );
};

export default AddRow;
