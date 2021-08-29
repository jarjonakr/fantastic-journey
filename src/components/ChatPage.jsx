import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UserContext } from "../context/UserContext";
import gql from "graphql-tag";
import Message from "./Message";
import MessageInput from "./MessageInput";

const GET_MESSAGES = gql`
  query FetchMessages {
    fetchMessages {
      id
      body
      chatRoomId
      createdAt
      username
    }
  }
`;

const CREATE_MESSAGE = gql`
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

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { username } = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_MESSAGES);

  // get chatroom id from another query
  const roomId = 1;

  console.log("username", username);

  const params = {
    chatRoomId: roomId,
    body: message,
    username,
  };

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    variables: { params },
    onCompleted: (newMessage) => {
      console.log("we have data?", newMessage);
    },
  });

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { fetchMessages: messages } = data;

  return (
    <div className="h-100 container w-50">
      <div className="overflow-auto mt-5 h-75 bg-light border border-3">
        {messages.map(({ id, body, username, createdAt }) => (
          <Message
            key={id}
            body={body}
            username={username}
            createdAt={createdAt}
          />
        ))}
        <AlwaysScrollToBottom />
      </div>
      <MessageInput
        message={message}
        setMessage={setMessage}
        createMessage={createMessage}
      />
    </div>
  );
};

export default ChatPage;
