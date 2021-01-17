import React, { Component } from "react";

const AddRow = ({ handleAddRows }) => {
    return (       <button
        onClick={() => handleAddRows()}
        className="btn btn-secondary btn-sm m-2"
      >
        Add Row
      </button> );
}
 
export default AddRow;
