/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UserContext } from "../context/UserContext";
import { CREATE_MESSAGE } from "../graphql/mutations/messages";
import { GET_MESSAGES } from "../graphql/queries/messages";
import { GET_CHATROOM } from "../graphql/queries/chatroom";
import { MESSAGE_SUBSCRIPTION } from "../graphql/queries/subscription";
import Message from "./Message";
import MessageInput from "./MessageInput";
import ScrollToBottom from "./ScrollToBottom";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { username } = useContext(UserContext);
  const { entryCode } = useParams();

  const { subscribeToMore, data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { entryCode },
  });

  const { data: chatRoomData } = useQuery(GET_CHATROOM, {
    variables: { entryCode },
  });

  const chatRoomId = chatRoomData && chatRoomData.fetchChatRoom.id;

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { chatRoomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAddedToRoom;
        if (newMessage && prev) {
          return Object.assign({}, prev, {
            fetchChatRoomMessages: [...prev.fetchChatRoomMessages, newMessage],
          });
        }
      },
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  const params = {
    chatRoomId,
    body: message,
    username,
  };

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    variables: { params },
    refetchQueries: [GET_MESSAGES],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { fetchChatRoomMessages: messages } = data;

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
        <ScrollToBottom />
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
