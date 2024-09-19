import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from "react-router-dom";

//create a new class to instantiate for a user
class AuthService {

    //get user data from JSON web token by decoding
    getUser() {
        return jwtDecode(this.getToken());
    }

    //return true or false if token exists
    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        //retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        //Save
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');

    }
    logout() {
        //clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        //reload page and reset state 
        window.location.reload();
    }
}

export default new AuthService();