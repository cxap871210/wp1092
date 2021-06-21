import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query getChatBox(
        $name1: String!
        $name2: String!
    ){
        getChatBox(
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