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
  query gameByDate($gameDate: String!) {
    gameByDate(gameDate: $gameDate) {
      gameDate
      startTime
      capacity
      endTime
      userId
      fieldId {
        _id
        fieldName
        image
        location
      }
    }
  }
`;
