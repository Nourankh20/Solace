import apiService from "../services/apiService";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
/**
 * Retrieves a user by ID
 * @param {string} userId - User's ID
 * @returns {User} User object
 */

export function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}

/**
 * Retrieves the authenticated user from the users DB
 * if the user was found registerd his token and his data are saved in the local storage
 * Otherwise, an alert is displayed
 * @returns {useMutation} Axios Response that conatins the authinticated user.
 */

export function useMutateLoginUser() {

  return useMutation(user => {
    return apiService.post(`http://localhost:5000/auth/login`, user);
  },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        //save the token and userData in localStorage 
        localStorage.setItem("jwt", responseData.data.token);
        localStorage.setItem("user", JSON.stringify(responseData.data._doc));
        window.location.replace("http://localhost:3000")

      },
      onError: (e) => { alert('Invalid password or email') },
    }
  );

}

/**
 * Registers the new User and redirect him to the login page
 * @returns {useMutation} Axios Response that add the newely registerd user to the DB.
 */

export function useMutateRegisterUser() {
  return useMutation(async user => {
    const data = new FormData();
    return await apiService.post(`http://localhost:5000/user/register`, user);
  },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page------------>
        window.location.replace("http://localhost:3000")
      },
      onError: (e) => { console.log(e.message); alert('you have registsred with this id or email before'); },
    });
}
/**
 * Adds the new transfer 
 * @returns {useMutation} Axios Response that add the transfer to the DB.
 */
export function useMutateTransferUser() {
  return useMutation(async transactions => {
    const data = new FormData();
    return await apiService.post(`http://localhost:5000/transactions/internaltransfer`, transactions);
  },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // informs user that transfer  is completed  
        alert('Transfer completed Sucessfully ');
      },
      onError: (e) => { alert("Invalid request"); }



    });
}

export function useMutateExternaltransfer() {
  return useMutation( async transfer => {
    const data = new FormData();
    // const balance = apiService.get(`http://localhost:5000/accounts/user/balance/${localStorage.getItem(accountid)}`);
    return await axios.post(`http://localhost:5000/external/createtransfer`, transfer, { headers: { 'Bypass-Tunnel-Reminder': "any" } })
    .then( 
      alert("successful transfer")
).catch( (e) => alert(e.message));
  });
}
