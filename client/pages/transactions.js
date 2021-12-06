import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import apiService from "../services/apiService";
import Table from 'react-bootstrap/Table'
import Logout from '../components/Logout';
import styles from "../styles/Home.module.css";
import {
  Form,
  FormGroup,
  Button,
} from "reactstrap";


export default function Dashboard() {
  const [Transactions, viewTransactions] = useState([]);
  const [balance, setBalance] = useState(" ");

  useEffect(async () => {
    console.log("Mounting!");
    const accountId = localStorage.getItem("accountid");
    const response = await apiService.get(
      `http://localhost:5000/transactions/${accountId}`
    );

    viewTransactions(response.data);
    calculateBalance(accountId);

  }, []);

  //getting the balance of the account
  const calculateBalance = async (accountid) => {
    const response = await apiService.get(
      `http://localhost:5000/accounts/user/balance/${accountid}`
    );
    setBalance(response.data);
  };

  return (
    <div className={styles.border}>
      
      <Logout/>
      <Button style={{justifyContent: 'right'}} color="primary" className="float-right" onClick={() => {
        window.location.replace("http://localhost:3000"); }}> Back </Button> 
      <br></br>
      <h2 >Account Balance: {balance}$</h2>
      <Form className={styles.form}>
      <FormGroup >
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr align='center'>
          <th scope="col">From/To</th>
            <th scope="col">Date</th>
            <th scope="col">Transaction name</th>
            <th scope="col">Credit</th>
            <th scope="col">Debit</th>
            <th scope="col">Amount</th>

          </tr>
        </thead>
        <tbody>
          {" "}
          {Transactions.map((Transaction, key) => (
            <tr align='center'>
              <td>{Transaction.from_To}</td>
              <td>{Transaction.Display_date}</td>
              <td>{Transaction.name}</td>
              <td>{Transaction.credit ? Transaction.amount : "  "}</td>
              <td>{Transaction.debit ? Transaction.amount : "   "}</td>
              <td>{Transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </FormGroup>
      </Form>
    </div>
  );
}
