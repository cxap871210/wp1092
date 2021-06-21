import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription OnMessage(
        $chatbox_name: String!
    ) {
        message(
            chatbox_name: $chatbox_name
        ) {
            body
            sender
        }
    }
`;