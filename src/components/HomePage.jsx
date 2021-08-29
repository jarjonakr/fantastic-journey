import React from "react";

const HomePage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center container w-25 h-100">
      <form
        onSubmit={() => {
          // do some stuff
        }}
        className="d-flex flex-column"
      >
        <input placeholder="enter chat room code" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default HomePage;
