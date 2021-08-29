import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($params: MessageInput!) {
    createMessage(input: { params: $params }) {
      message {
        id
        body
        chatRoomId
        createdAt
        username
      }
    }
  }
`;
