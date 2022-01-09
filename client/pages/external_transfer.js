import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useMutateExternalTransfer } from "../adapters/user";


export default function ExternalTransfer() {
  const [AccountID, setAccountID] = useState("");
  const [Amount, setAmount] = useState("");
  const [Bank, setBank] = useState("");
  const [Description, setDescription] = useState("");

    const [AccountID, setAccountID] = useState("");
    const [Amount, setAmount] = useState("");
    const [Bank, setBank] = useState("");
    const [Description, setDescription] = useState("");
    const [URL, setURL] = useState("");
    const useExternalMutation = useMutateExternalTransfer();

    const [accountIDState, setAccountIDState] = useState("");
    const [amountState, setAmountState] = useState("");
    //const [Bank, setBank] = useState("");
    const [descriptionState, setDescriptionState] = useState("");

    /**
     * Checks if the Account ID entered by the user is valid or not.
     * @param {string} value -The account ID of the reciever the user wants to send to.
     */

     const validateAccountID = (value) => {
        let accountIDState;
        if (value.length > 0) {
            accountIDState = "has-success";
        }
        else {
            accountIDState = "has-danger";
        }
        setAccountIDState(accountIDState);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateAccountID(value);
    validateAmount(value);
    validateDescription(value);

    if (
      accountIDState === "has-success" &&
      amountState === "has-success" &&
      descriptionState === "has-success"
    ) {
    }
  };

  return (
    <div className={styles.app}>
      <h1> External Funds Transfer </h1>

      <Button
        class="btn btn-info"
        onClick={() => {
          window.location.replace("http://localhost:3000");
        }}
      >
        Return to Sign in
      </Button>
      <br></br>
      <br></br>
      <Button class="btn btn-info"
        onClick={() => {
          window.location.replace("http://localhost:3000/");
        }}
      >
        Return to Dashboard
      </Button>
      <br></br>
      <br></br>
      <Button
        class="btn btn-info"
        onClick={() => {
          window.location.replace("http://localhost:3000/internal_transfer");
        }}
      >
        Go to internal transfer
      </Button>

    /**
     * Checks if the Amount entered by the user is not more than 50 as the maximum transaction allowed is 50.
     * @param {string} value -The amount of money the user wants to transfer.
     */

      const validateAmount = (value) => {
        const max = 50; 
        let amountState; 
        if (max <= value) {
            amountState = "has-success"
        }else {
            amountState = "has-danger"
        }
        setAmountState(amountState)
      }


    /**
     * Checks if the Description entered by the user is valid or not.
     * @param {string} value -The description of the transfer.
     */
      const validateDescription = (value) => {
        let descriptionState;
        if (value.length > 5) {
            descriptionState = "has-success";
        }
        else {
            descriptionState = "has-danger";
        }
        setDescriptionState(descriptionState);
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "accountID") {
          validateAccountID(value);
          setAccountID(value);
        }
        
        else if (name === "amount") {
          validateAmount(value);
          setAmount(value);
        }
    
        else if (name === "description") {
          validateDescription(value);
          setDescription(value);
        }

        else if (name === "bankSelect") {
            setBank(value)
        }

      };


      const handleSubmit = (event) => {
        event.preventDefault();

        validateAccountID(value);
        validateAmount(value);
        validateDescription(value);
    
        if (
          accountIDState==="has-success"&&
          amountState==="has-success"&&
          descriptionState==="has-success"
        ) {

          // Call User Register Adapter
          useExternalMutation.mutate(
            {
              "accountid": localStorage.getItem("accountid"),
              "receiverAccountNumber": AccountID,
              "url": URL,
              "amount": Amount,
              "description": Description,
            }
          );
        }
      };


    return (
      <div className = {styles.app}>
         <h1> External Funds Transfer  </h1>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleNumber">Receiver Account ID</Label>
          <Input
            type="number"
            name="accountID"
            id="accountID"
            placeholder="id"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">Amount (EGP)</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="enter amount in EGP"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select a bank</Label>
          <Input type="select" name="bankSelect" id="bankSelect" onChange={handleChange}>
            <option onClick={setURL(`https://safemonii.loca.lt/`)}> Safemonii </option>
            <option onClick={setURL(`https://ironbank.loca.lt/`)}> ironbank </option>
            <option>Bank 3</option>
            <option>Bank 4</option>
            <option>Bank 5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="example: money transfer"
            onChange={handleChange}
          />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    </div>
  );
}
