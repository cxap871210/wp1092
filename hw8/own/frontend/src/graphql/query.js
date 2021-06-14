import { gql } from '@apollo/client';


const GET_MESSAGES_QUERY = gql`
  query getMessages(
    $name1: String!
    $name2: String!
  ) {
    getMessages(name1: $name1, name2: $name2) 
  }
`;


export {GET_MESSAGES_QUERY};