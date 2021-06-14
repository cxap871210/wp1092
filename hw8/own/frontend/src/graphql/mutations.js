import { gql } from '@apollo/client';


const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(name1: $name1, name2: $name2) {
      id
      name
      senders
      messages
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $name1: String!
    $name2: String!
    $body_input: String!
  ) {
    createMessage(name1: $name1, name2: $name2, body_input: $body_input) {
      id
      sender
      body
    }
  }
`;


export {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION};