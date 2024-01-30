import React from "react";

function Loader() {
  return (
    <div className="align-items-center d-flex justify-content-center text-center text-secondary" style={{minHeight:"80vh"}}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
