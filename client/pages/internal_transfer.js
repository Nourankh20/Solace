/*
accountid
amount 
description
*/

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

export default function InternalTransfer() {
    //properties
    const [recieverAccountid, setrecieverAccountid] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    //states
    const [recieverAccountidState, setrecieverAccountidState] = useState("");
    const [amountState, setAmountState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");

    const useTransferMutation = useMutateTransferUser();
    const defaultrecieverAccountid = 12345678910;
    
  
    if (recieverAccountid.length == 0 || isNaN(Number(recieverAccountid))) { setrecieverAccountid(defaultrecieverAccountid) };
    useEffect(() => {
        axios.get(`http://localhost:5000/reciever/account/${recieverAccountid}`).then((recieverAccount) => {
            setrecieverAccountid(recieverAccount.data);
        })
    }, [recieverAccountid])

    const validateAccountId = (value) => {
        /*Call a get request to check account is valid*/

        let recieverAccountidState;
        if (value == true) {
            recieverAccountidState = "has-success";
        }
        else {
            recieverAccountidState = "has-danger";
        }
        setrecieverAccountidState(recieverAccountidState);
    }
    /*
    const validateDescriptionState = (value) => {
        let descriptionState;
        if (value == true) {
            descriptionState = "has-success";
        }
        else {
            descriptionState = "has-danger";
        }
        setDescriptionState(descriptionState);
    }
    */
    /* if isNan() to  check its a number */
    const validateAmountState = (value) => {
        let amountState;
        if (!value.isNan(value)) {
            amountState = "has-success";
        }
        else {
            amountState = "has-danger";
        }
        setAmountState(amountState);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (recieverAccountid === "recieverAccountid") {
            validateAccountId(value);
            setrecieverAccountid(value);
        }

        else if (name === "amount") {
            validateAmountState(value);
            setAmountState(value);
        }

        // else if (name === "description") {
        //     validateDescriptionState(value);
        //     setDescriptionState(value);

        // }




    }


    const handleSubmit = (event) => {
        event.preventDefault();
        validateAccountId();
        validateAmountState();
        // validateDescriptionState();

        if (
            accountIdState === "has-success" &&
            amountState === "has-success"
        ) {
            // Call User Transfer Adapter
            useTransferMutation.mutate(
                {
                    "from_To": recieverAccountid,
                    "Display_date": (new Date()).toDateString(),
                    "description": "internal transfer",
                    "debit": 1,
                    "credit": 0,
                    "amount": Number (amount),
                    "accountid": window.localStorage.getItem("accountid")
                }
            );

        }

    }
}