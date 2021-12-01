import { Button } from "reactstrap";
//import React from "react";

export default function Logout() {

    const handleLogout= ()=>{
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("user");
        window.location.reload();
    };

  return(
  
  <div className="d-flex justify-content-end mb-3">
    <Button color="danger" onClick={handleLogout}>Logout</Button>
  </div>
  
  );
}
