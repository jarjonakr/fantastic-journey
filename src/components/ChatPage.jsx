import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Message from "./Message";

const GET_MESSAGES = gql`
  query FetchMessages {
    fetchMessages {
      id
      createdAt
      chatRoomId
      body
      username
      updatedAt
    }
  }
`;

const ChatPage = () => {
  const { data, loading, error } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { fetchMessages: messages } = data;

  return (
    <div className="overflow-auto my-5 h-75 container bg-light border border-3">
      {messages.map(({ id, body, username, createdAt }) => (
        <Message
          key={id}
          body={body}
          username={username}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
};

export default ChatPage;
