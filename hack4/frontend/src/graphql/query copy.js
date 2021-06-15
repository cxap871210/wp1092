import { gql } from '@apollo/client';


const GET_COUNT_QUERY = gql`
  query statsCount(
    $severity: Int!
    $locationKeywords: [String]!
  ) {
    statsCount(severity: $severity, locationKeywords: $locationKeywords) 
  }
`;


export {GET_COUNT_QUERY};