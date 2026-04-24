import { gql } from "@apollo/client";
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      username
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
    }
  }
`;




