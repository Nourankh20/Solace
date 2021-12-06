import { useState, useEffect } from "react";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Register from "../pages/register"
import Transactions from "../pages/transactions"


export default function Home() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setAccessToken(token);
  }, []);
  //return <Dashboard/>
  return accessToken ? <Dashboard /> : <Login />;
}
