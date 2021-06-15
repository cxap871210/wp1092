import { gql } from '@apollo/client';
import {GET_MESSAGES_QUERY} from "../graphql/query"


const GET_COUNT_QUERY = gql`
  query statsCount(
    $severity: Int!
    $locationKeywords: [String]!
  ) {
    statsCount(severity: $severity, locationKeywords: $locationKeywords) 
  }
`;


export {GET_COUNT_QUERY};