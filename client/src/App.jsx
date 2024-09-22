import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./utils/auth.js";
import "./styles/App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

//construct request middleware that will attach JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  //get auth token from local storage if it exists
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false); // Flag to track navigation

  // this use when signup to navigate user to updateProfile
  useEffect(() => {
    const isNewUser = localStorage.getItem("isNewUser"); // get isNewUser that we set to ture when we signup to
    console.log("user is loggedin I am in effect");
    console.log(isNewUser);
    if (Auth.loggedIn() && !hasNavigatedRef.current) {
      if (isNewUser === "true") {
        navigate("/updateProfile"); // navigate to updateProfile
        localStorage.removeItem("isNewUser"); // Clear the flag after redirection
      } else {
        navigate("/"); // Redirect regular users to home or another
      }
      hasNavigatedRef.current = true;
    }
  }, [navigate]);

  return (
    <>
      <ApolloProvider client={client}>
        <Nav />
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
