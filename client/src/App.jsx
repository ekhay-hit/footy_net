import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx";

import "./styles/App.css";

const client = new ApolloClient({
  uri: "/graphql",
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
