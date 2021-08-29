import { gql } from "@apollo/client";

export const GET_CHATROOM = gql`
  query FetchChatRoom($entryCode: String!) {
    fetchChatRoom(entryCode: $entryCode) {
      id
      title
      entryCode
    }
  }
`;
