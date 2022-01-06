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

export default function Transfer() {
    //properties
    const [accountid, setAccountid] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    //states
    const [accountIdState, setaccountIdState] = useState("");
    const [amountState, setAmountState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");

    const validateAccountId = (value) => {
        let accountIdState;
        if (value == true) {
            accountIdState = "has-success";
        }
        else {
            accountIdState = "has-danger";
        }
        setaccountIdState(accountIdState);
    }

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

    const validateAmountState = (value) => {
        let amountState;
        if (value == true) {
            amountState = "has-success";
        }
        else {
            amountState = "has-danger";
        }
        setAmountState(amountState);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "accountId") {
            validateAccountId(value);
            setAccountid(value);
        }

        else if (name === "amount") {
            validateAmountState(value);
            setAmountState(value);
        }

        else if (name === "description") {
            validateDescriptionState(value);
            setDescriptionState(value);

        }

        


    }

}