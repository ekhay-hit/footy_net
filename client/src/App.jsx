import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import { setContext } from '@apollo/client/link/context';

import "./styles/App.css";


const httpLink =  createHttpLink({
  uri: "/graphql",
});

//construct request middleware that will attach JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  //get auth token from local storage if it exists
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
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
