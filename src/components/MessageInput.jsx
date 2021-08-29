import React from "react";
import { Form, Button } from "react-bootstrap";

const MessageInput = ({ message, setMessage, createMessage }) => {
  return (
    <Form className="mt-4">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="input"
          rows={3}
          value={message}
          placeholder="go on, type something"
          onChange={({ target: { value } }) => setMessage(value)}
        />
      </Form.Group>
      <Button
        variant="outline-secondary"
        type="submit"
        disabled={!message.length}
        onClick={() => {
          createMessage();
          setMessage("");
        }}
      >
        send
      </Button>
    </Form>
  );
};

export default MessageInput;
