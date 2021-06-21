import { gql } from '@apollo/client';

export const MESSAGE_QUERY = gql`
    query getMessages($chatbox_name: String!) {
        messages(chatbox_name: $chatbox_name) {
            sender
            body
        }
    }
`;