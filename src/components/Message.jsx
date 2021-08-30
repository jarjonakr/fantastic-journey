import React from "react";

const Message = ({ body, createdAt, username }) => (
  <div className=" d-flex m-3 p-2 border bg-white w-75">
    <span className="me-3">{username}:</span>
    <span className="me-3 w-50 text-break">{body}</span>
    <span className="ms-auto fst-italic fw-light text-end">
      {new Date(createdAt).toLocaleString()}
    </span>
  </div>
);

export default Message;
