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

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($avatar: String!) {
    updateUser(avatar: $avatar) {
      token
      user {
        _id
        username
        email
        avatar
      }
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame(
    $fieldName: String!
    $startTime: String!
    $capacity: Int!
    $price: Float!
    $endTime: String!
    $isRecurring: Boolean!
    $gameDate: Date!
  ) {
    createGame(
      fieldName: $fieldName
      startTime: $startTime
      capacity: $capacity
      price: $price
      endTime: $endTime
      isRecurring: $isRecurring
      gameDate: $gameDate
    ) {
      gameDate
      startTime
      capacity
      endTime
      isRecurring
      userId
    }
  }
`;
export const JOIN_GAMES = gql`
  mutation joinGames($gameId: ID!, $count: Int!) {
    joinGames(gameId: $gameId, count: $count) {
      _id
      gameDate
      startTime
      capacity
      price
      endTime
      isRecurring
      players {
        _id
        username
        email
        avatar
      }
      userId
      field {
        _id
        location
        fieldName
        image
        userId
      }
    }
  }
`;

export const WITHDRAWFROM_GAMES = gql`
  mutation withdrawFromGames($gameId: ID!) {
    withdrawFromGames(gameId: $gameId) {
      _id
      gameDate
      startTime
      capacity
      price
      endTime
      isRecurring
      players {
        _id
        username
        email
        avatar
      }
      userId
      field {
        _id
        location
        fieldName
        image
        userId
      }
    }
  }
`;
