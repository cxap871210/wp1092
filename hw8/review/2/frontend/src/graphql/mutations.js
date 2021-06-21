import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ){
        createChatBox(
            name1: $name1, 
            name2: $name2
        ){
            id
            name
            messages{
                sender{
                    name
                }
                body
            }
        }
    }     
`;
const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $name: String!
        $to: String!
        $body: String!
    ){
        createMessage(
            name: $name, 
            to: $to, 
            body: $body
        ){
            sender{
                name
            }
              body
        }
    }     
`;
export { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } 