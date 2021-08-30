import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription ($roomId: ID!) {
    messageAddedToRoom(roomId: $roomId) {
      id
      body
      chatRoomId
      createdAt
      username
    }
  }
`;
