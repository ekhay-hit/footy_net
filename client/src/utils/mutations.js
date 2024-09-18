import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CREATE_USER(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LOGIN_USER($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
