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

export const ADD_FIELD = gql`
  mutation addField($location: String!, $fieldName: String!, $image: String!) {
    addField(location: $location, fieldName: $fieldName, image: $image) {
      _id
      location
      fieldName
      image
      userId
    }
  }
`;

export const REMOVE_FIELD = gql`
  mutation removeField($fieldId: ID!) {
    removeField(fieldId: $fieldId) {
      success
      message
    }
  }
`;
