import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { UserContext } from "../context/UserContext";

const DEFAULT_STATE = {
  username: "",
  entryCode: "",
};

const GET_CHATROOM = gql`
  query FetchChatRoom($entryCode: String!) {
    fetchChatRoom(entryCode: $entryCode) {
      id
      entryCode
    }
  }
`;

const HomePage = () => {
  const [entryInfo, setEntryInfo] = useState(DEFAULT_STATE);
  const { setUsername } = useContext(UserContext);
  const history = useHistory();

  const [getChatroom, { error }] = useLazyQuery(GET_CHATROOM, {
    onCompleted: ({ fetchChatRoom }) => {
      setUsername(entryInfo.username);
      history.push(`chat/${fetchChatRoom.entryCode}`);
    },
  });

  const handleChange = (field, value) => {
    setEntryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    getChatroom({ variables: { entryCode: entryInfo.entryCode } });
  };

  return (
    <div className="d-flex align-items-center justify-content-center container w-25 h-100">
      <form className="d-flex flex-column">
        <label>username</label>
        <input
          onChange={({ target: { value } }) => handleChange("username", value)}
          placeholder="anon"
        />
        <label className="mt-2">chat room id</label>
        <input
          onChange={({ target: { value } }) => handleChange("entryCode", value)}
        />
        {error && <label className="text-danger">incorrect chat room id</label>}
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("clicking");
            handleSubmit();
          }}
          className="mt-4"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
