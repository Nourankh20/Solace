import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useMutateLoginUser } from '../adapters/user'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const useLoginMutations = useMutateLoginUser();


  /**
   * Checks if the email the user typed is valid or not.
   * @param {string} value -The giu email of the user
   */
  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailState;
    if (emailRegex.test(value)) {
      emailState = "has-success";
    } else {
      emailState = "has-danger";
    }
    setEmailState(emailState);
  };

  const validatePassword = (value) => {
    let passwordState;
    if(password.length>0){
      passwordState = "has-success";
    } else {
      passwordState = "has-danger";
    }

    setPasswordState(passwordState)

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else {
      setPassword(value);
      validatePassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateEmail(email);
    validatePassword(password);

    if(emailState === "has-success" &&
    passwordState === "has-success"){

      // Call User Login Adapter
      useLoginMutations.mutate({
        "email": email,
        "password": password
      });

    }


  };
  return (
    <div className={styles.App}>
      <h2>Sign In</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup >
          <Label className={styles.label} for="email">
            Email
          </Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="example@email.com"
            onChange={handleChange}
            valid={emailState === "has-success"}
            invalid={emailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            valid={passwordState === "has-success"}
            invalid={passwordState === "has-danger"}
          />
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <Button color="success" onClick={() => { window.location.replace("http://localhost:3000/register") }}>Sign Up</Button>
      </Form>
    </div>
  );
}