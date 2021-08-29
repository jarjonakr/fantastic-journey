import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const DEFAULT_STATE = {
  username: "",
  entryCode: "",
};

const HomePage = () => {
  const [data, setData] = useState(DEFAULT_STATE);
  const { setUsername } = useContext(UserContext);
  const history = useHistory();

  const setState = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center container w-25 h-100">
      <form
        onSubmit={() => {
          console.log("yooo whats uyp", data);
          setUsername(data.username);
          history.push(`chat/${data.entryCode}`);
        }}
        className="d-flex flex-column"
      >
        <label>username</label>
        <input
          onChange={({ target: { value } }) => setState("username", value)}
        />
        <label className="mt-2">chat room id</label>
        <input
          onChange={({ target: { value } }) => setState("entryCode", value)}
        />
        <button className="mt-4" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
