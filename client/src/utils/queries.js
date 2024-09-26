import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
    }
  }
`;

export const FIELDS_BY_USER = gql`
  query fieldsByUser {
    fieldsByUser {
      _id
      location
      fieldName
      image
      userId
    }
  }
`;
export const GAME_BY_DATE = gql`
  query GameByDate($gameDate: Date!) {
    gameByDate(gameDate: $gameDate) {
      _id
      capacity
      endTime
      gameDate
      isRecurring
      price
      startTime
      userId
      players {
        _id
        username
        email
        avatar
      }
      field {
        _id
        fieldName
        image
        location
      }
    }
  }
`;
export const GAMES_BY_USER = gql`
  query gamesByUser {
    gamesByUser {
      _id
      capacity
      endTime
      field {
        _id
        image
        location
        userId
      }
      gameDate
      isRecurring
      price
      startTime
      userId
      players {
        _id
        username
        email
        avatar
      }
    }
  }
`;
