import React, { useEffect, useState } from 'react';
import apiService from "../services/apiService";
import Table from 'react-bootstrap/Table'
import Logout from './Logout';
import {
  Form,
  FormGroup,
  Button
} from "reactstrap";
import styles from "../styles/Home.module.css";
import Navbar from './Navbar';




export default function Dashboard() {
  const [accounts, viewAccounts] = useState([]);

  useEffect(async () => {
    /*const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
  };*/
    console.log("Mounting!");
    const user = JSON.parse(localStorage.getItem("user")).userId;

    const response = await apiService.get(`http://localhost:5000/accounts/${user}`/*,config*/)
    viewAccounts(response.data)
  }, []);


  return (
    <div className={styles.border}>
      <Button
        color="outline-primary"
        onClick={() => {
          window.location.replace("http://localhost:3000/external_transfer");
        }}
      >
        Go to external transfer
      </Button>
      <br></br>
      <br></br>
      <Button variant="info"
        onClick={() => {
          window.location.replace("http://localhost:3000/internal_transfer");
        }}
      >
        Go to internal transfer
      </Button>
      <Logout />
      <h1 >Accounts</h1>
      <Form className={styles.form}>
        <FormGroup >
          <Table striped bordered hover >
            <thead className="thead-dark">
              <tr align='center'>
                <th align='center' scope="col">#</th>
                <th align='center' scope="col">Status</th>
                <th align='center' scope="col">Transactions</th>
              </tr>
            </thead>
            <tbody>{
              accounts.map((account, key) => (
                <tr>
                  <><td align='center'>{key}</td>
                    <td align='center'>{account.status}</td>
                    <td align='center'>
                      <Button color="outline-info" size="sm" onClick={() => {
                        localStorage.setItem("accountid", account.accountid),
                          window.location.replace("http://localhost:3000/transactions")
                      }}>View Details</Button></td>
                  </>

                </tr>))}
            </tbody>

          </Table>
        </FormGroup>
      </Form>
    </div>
  );

}




