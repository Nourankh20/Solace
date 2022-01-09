/*
accountid
amount 
description
*/
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import styles from "../styles/Home.module.css";
import { useMutateTransferUser } from "../adapters/user";
import axios from "axios";

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

  const validateAccountId = async (value) => {
    //Call a get request to check account is valid

    let recieverAccountidState;


    if (value.length === 12) {
      // const account = await axios.get(
      //   `http://localhost:5000/reciever/account/${value}`
      // );
      // if(account){
        recieverAccountidState = "has-success";
      //  setAccount(account.data);
      //}
      
    } else {
      recieverAccountidState = "has-danger";
    }
    setrecieverAccountidState(recieverAccountidState);
  };

  const validateDescriptionState = (value) => {
    let descriptionState;
    if (Object.keys(value).length >= 2) {
      descriptionState = "has-success";
    } else {
      descriptionState = "has-danger";
    }
    setDescriptionState(descriptionState);
  };

  /* if isNan() to  check its a number */
  const validateAmountState = async (value) => {
    let amountState;
    // const balance = await apiService.get(
    //   `http://localhost:5000/accounts/user/balance/${account.data.id}`
    // );
    if (value > 0) {
      amountState = "has-success";
    } else {
      amountState = "has-danger";
    }
    setAmountState(amountState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "accountid") {
      validateAccountId(value);
      setrecieverAccountid(value);
    } else if (name === "amount") {
      validateAmountState(value);
      setAmount(value);
    } else if (name === "description") {
      validateDescriptionState(value);
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAccountId(recieverAccountid);
    validateAmountState(amount);
    validateDescriptionState(description);

    if (recieverAccountidState === "has-success" && amountState === "has-success" && descriptionState === "has-success") {
      // Call User Transfer Adapter
      useTransferMutation.mutate({
        "from_To": recieverAccountid,
        "Display_date": new Date().toDateString(),
        "description": description,
        "debit": 1,
        "credit": 0,
        "amount": Number(amount),
        "accountid": window.localStorage.getItem("accountid"),
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
            type="Number"
            name="accountid"
            id="accountid"
            placeholder="Enter account id (12 numbers)"
            onChange={handleChange}
            valid={recieverAccountidState === "has-success"}
            invalid={recieverAccountidState === "has-danger"}
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
