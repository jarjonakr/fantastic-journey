import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query FetchChatRoomMessages($entryCode: String!) {
    fetchChatRoomMessages(entryCode: $entryCode) {
      id
      body
      chatRoomId
      createdAt
      username
    }
  }
`;
