import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText , FormFeedback, View, ButtonGroup } from "reactstrap";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useMutateExternaltransfer } from "../adapters/user";


export default function ExternalTransfer() {

    //properties
    const [AccountID, setAccountID] = useState("");
    const [AccountIDMine, setAccountIDMine] = useState("");
    const [Amount, setAmount] = useState("");
    const [Description, setDescription] = useState("");
    const [URL, setURL] = useState("");

    //States
    const [accountIDState, setAccountIDState] = useState("");
    const [amountState, setAmountState] = useState("");
    const [URLState, setURLState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const useExternalMutation = useMutateExternaltransfer();


    useEffect(async () => {
      console.log("Mounting!");
      const accountId = localStorage.getItem("accountid");
      setAccountIDMine(accountId.toString());
      console.log(accountId.toString());
  
    }, []);
  
    /**
     * Checks if the Account ID entered by the user is valid or not.
     * @param {string} value -The account ID of the reciever the user wants to send to.
     */

     const validateAccountID = (value) => {
        let accountIDState;
        if (value.length === 12) {
            accountIDState = "has-success";
        }
        else {
            accountIDState = "has-danger";
        }
        setAccountIDState(accountIDState);
    }
    /**
     * Checks if the Amount entered by the user is not more than 50 as the maximum transaction allowed is 50.
     * @param {string} value -The amount of money the user wants to transfer.
     */

      const validateAmount = (value) => { 
        let amountState; 
        if (value.length>0 && value <= 50) {
            amountState = "has-success"
        }else {
            amountState = "has-danger"
        }
        setAmountState(amountState)
      }

      const validateURL = (value)=>{
        let urlState;
        if (value.length>0 && value !== "default") {
          urlState = "has-success"
      }else {
          urlState = "has-danger"
      }
      setURLState(urlState);
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
        else if (name === "bankSelect"){
          validateURL(value);
          setURL(value);
        }

       

      }


      const handleSubmit = (event) => {
        event.preventDefault();

        validateAccountID(AccountID);
        validateAmount(Amount);
        validateDescription(Description);
        validateURL(URL);

        if (
          accountIDState==="has-success"&&
          amountState==="has-success"&&
          descriptionState==="has-success" &&
          URLState ==="has-success"
        ) {

          // Call User Register Adapter
          useExternalMutation.mutate(
            {
              "accountid":AccountIDMine,
              "receiverAccountNumber": AccountID,
              "url": URL,
              "amount": Amount,
              "description": Description,
            }
          );
        }
      };


    return ( 
   
      <div className={styles.App}>
        
          <Button class="btn btn-info" color = "success" onClick={() => { window.location.replace("http://localhost:3000");}}>
              Return to Sign in
          </Button>
          &nbsp;&nbsp;&nbsp;
          
          <Button class="btn btn-info" color = "success" onClick={() => { window.location.replace("http://localhost:3000/");}}>
            Return to Dashboard
          </Button>
          &nbsp;&nbsp;&nbsp;
        
          <Button class="btn btn-info" onClick={() => { window.location.replace("http://localhost:3000/internal_transfer");}}>
            Go To Internal Transfer
          </Button>
      

      <h1> External Funds Transfer  </h1>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="accountID">Receiver Account ID</Label>
          <Input
            type="number"
            name="accountID"
            id="accountID"
            placeholder="id"
            valid={accountIDState === "has-success"}
            invalid={accountIDState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>Account id not found.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="amount">Amount (EGP)</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="enter amount in EGP"
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>Invalid amount hint: It needs to be less than 50.</FormFeedback>
        </FormGroup>

        <FormGroup>
        <Label for="bankSelect">Select a bank</Label>
            <select defaultValue="Choose Bank" onChange={(event) =>setURL(event.target.value)}>
                <option value = "default"> Please Pick A bank </option>
                <option value = "https://safemonii.loca.lt/"> Safemonii </option>
                <option value = "https://ironbank.loca.lt/"> Ironbank </option>
                <option value = "https://myfsd.loca.it/"> My Fsd </option>
                <option value = "https://amryinternationalbank.loca.lt/"> Amry International Bank </option>
                <option value = "https://luckbank.loca.lt/" > Luck Bank </option>
            </select>
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="example: money transfer"
            valid={descriptionState === "has-success"}
            invalid={descriptionState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>Please don't leave it empty.</FormFeedback>
        </FormGroup>

           <Button color = "primary"> Submit</Button>

      </Form>
    </div>
  
  );
      
  };