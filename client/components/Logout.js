import { Button } from "reactstrap";


export default function Logout() {

    const handleLogout= ()=>{
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("accountid");
        window.location.replace("http://localhost:3000");
    };

  return(  
  <div className="d-flex justify-content-end mb-3">
    <Button className="float-right" color="danger"  onClick={handleLogout}>Logout</Button> 
  </div>
  
  );
}
