import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription ($chatRoomId: ID!) {
    messageAddedToRoom(chatRoomId: $chatRoomId) {
      id
      body
      chatRoomId
      createdAt
      username
    }
  }
`;
