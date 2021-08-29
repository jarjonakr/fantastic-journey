import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UserContext } from "../context/UserContext";
import { CREATE_MESSAGE } from "../graphql/mutations/messages";
import { GET_MESSAGES } from "../graphql/queries/messages";
import { GET_CHATROOM } from "../graphql/queries/chatroom";
import Message from "./Message";
import MessageInput from "./MessageInput";
import ScrollToBottom from "./ScrollToBottom";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { username } = useContext(UserContext);
  const { entryCode } = useParams();

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { entryCode },
  });

  const { data: chatRoomData } = useQuery(GET_CHATROOM, {
    variables: { entryCode },
  });

  const chatRoomId = chatRoomData && chatRoomData.fetchChatRoom.id;

  const params = {
    chatRoomId,
    body: message,
    username,
  };

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    variables: { params },
    refetchQueries: [GET_MESSAGES, "GetMesssages"],
    onCompleted: (newMessage) => {
      // do something socket related ? or is that handled in the api
      console.log("we have data?", newMessage);
    },
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
