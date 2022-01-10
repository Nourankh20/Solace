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
  /*
  The useState function is a built in hook that can be imported from the react package. 
  It allows you to add state to your functional components.
   Using the useState hook inside a function component, 
  you can create a piece of state without switching to class components. 
  */
  const [recieverAccountid, setrecieverAccountid] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [accountId, setAccountID] = useState("");

  //states
  const [recieverAccountidState, setrecieverAccountidState] = useState("");
  const [amountState, setAmountState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");

  // created in adapters user.js
  const useTransferMutation = useMutateTransferUser();
  // hook  to tell React that your component needs to do something after render
  useEffect(async () => {
    console.log("Mounting!");
    const accountId = localStorage.getItem("accountid");
    setAccountID(accountId.toString());
    console.log(accountId.toString());
  }, []);

  const validateAccountId = async (value) => {
    //Call a get request to check account is valid, checks reciever account id if its found or not 

    let recieverAccountidState;

    if (value.length === 12) {
      await axios
        .get(`http://localhost:5000/accounts/reciever/account/${value}`)
        .then((account) => {
          if (account) {
            recieverAccountidState = "has-success";
          } else {
            console.log("Not found");
            recieverAccountidState = "has-danger";
          }
        })
        .catch((error) => {
          alert("Account doesn't exist");
        });
    } else {
      recieverAccountidState = "has-danger";
    }
    setrecieverAccountidState(recieverAccountidState);
  };
  // checks Description is acceptable or not (has more than 2 charachters)
  const validateDescriptionState = (value) => {
    let descriptionState;
    if (Object.keys(value).length >= 2) {
      descriptionState = "has-success";
    } else {
      descriptionState = "has-danger";
    }
    setDescriptionState(descriptionState);
  };

  /* checks amount that user wants to transfer is avavalibale in his credit side or not and is more than 0  
  banks dont transfer with decimals 
  */
  const validateAmountState = async (value) => {
    const balance = await apiService.get(
      `http://localhost:5000/accounts/user/balance/${accountId}`
    );
    if (value > 0 && balance > value) {
      amountState = "has-success";
    } else {
      amountState = "has-danger";
    }
    setAmountState(amountState);
  };
  //regular function created to handle input change 
  /*In that handleChange() function, 
  you can call your update state function to update the state of your component according to the value from event.
  */
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
  /*
    The handleSubmit() function does two things: it logs the current value of the input element whenever the form is submitted, 
    and most importantly, it prevents the default HTML form behavior of browsing to a new page
  for example here it submits there reciever acccount id to get Validated and simillary with amount & descryption 
  then check if they all validated sucessfully it assign them  to their properties
  
  */
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
