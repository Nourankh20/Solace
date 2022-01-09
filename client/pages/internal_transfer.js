/*
accountid
amount 
description
*/

import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import apiService from "../services/apiService";
import Table from "react-bootstrap/Table";
import Logout from "../components/Logout";
import styles from "../styles/Home.module.css";
import { Form, FormGroup, Button } from "reactstrap";

export default function InternalTransfer() {
  //properties
  const [recieverAccountid, setrecieverAccountid] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");

  //states
  const [recieverAccountidState, setrecieverAccountidState] = useState("");
  const [amountState, setAmountState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");

  const useTransferMutation = useMutateTransferUser();
  const defaultrecieverAccountid = 12345678910;

  const validateAccountId = (value) => {
    //Call a get request to check account is valid

    let recieverAccountidState;

    const account =  axios.get(
      `http://localhost:5000/reciever/account/${value}`
    );
    if (account && account.toString().length == 12) {
      recieverAccountidState = "has-success";
      setAccount(account.data);
    } else {
      recieverAccountidState = "has-danger";
    }
    setrecieverAccountidState(recieverAccountidState);
  };

  const validateDescriptionState = (value) => {
    let descriptionState;
    if (value == true) {
      descriptionState = "has-success";
    } else {
      descriptionState = "has-danger";
    }
    setDescriptionState(descriptionState);
  };

  /* if isNan() to  check its a number */
  const validateAmountState = (value) => {
    let amountState;
    const balance =  apiService.get(
      `http://localhost:5000/accounts/user/balance/${account.data.id}`
    );
    if (!value.isNan(value) && value <= balance) {
      amountState = "has-success";
    } else {
      amountState = "has-danger";
    }
    setAmountState(amountState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (recieverAccountid === "recieverAccountid") {
      validateAccountId(value);
      setrecieverAccountid(value);
    } else if (name === "amount") {
      validateAmountState(value);
      setAmountState(value);
    } else if (name === "description") {
      validateDescriptionState(value);
      setDescriptionState(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAccountId();
    validateAmountState();
    validateDescriptionState();

    if (accountIdState === "has-success" && amountState === "has-success") {
      // Call User Transfer Adapter
      useTransferMutation.mutate({
        from_To: recieverAccountid,
        Display_date: new Date().toDateString(),
        description: "internal transfer",
        debit: 1,
        credit: 0,
        amount: Number(amount),
        accountid: window.localStorage.getItem("accountid"),
      });
    }
  };

  return (
    <div className={styles.App}>
      <Button class="btn btn-info"
        onClick={() => {
          window.location.replace("http://localhost:3000/");
        }}
      >
        Return to Dashboard
      </Button>

      <Button class="btn btn-info"
        onClick={() => {
          window.location.replace("http://localhost:3000/internal_transfer");
        }}
      >
        Go to internal transfer
      </Button>

      <Button
        color="outline-primary"
        onClick={() => {
          window.location.replace("http://localhost:3000");
        }}
      >
        Return to Sign in
      </Button>
      <h2>Transfer</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="accountid">
            Account id:
          </Label>
          <Input
            type="Numer"
            name="account id"
            id="accountid"
            placeholder="Enter account id (12 numbers)"
            onChange={handleChange}
            valid={accountIdState === "has-success"}
            invalid={accountIdState === "has-danger"}
          />
          <FormFeedback>Account id not found.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="amount">
            Amount:
          </Label>
          <Input
            type="Number"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            onChange={handleChange}
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
          />
          <FormFeedback>This is an invalid amount</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="description">
            Description:
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
            valid={descriptionState === "has-success"}
            invalid={descriptionState === "has-danger"}
          />
          <FormFeedback>Please don't leave it empty</FormFeedback>
        </FormGroup>

        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}
