import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Page not found...</p>
      <button onClick={() => navigate("/SignIn")} className="btn btn-primary">
        Home page
      </button>
    </div>
  );
}

export default PageNotFound;
