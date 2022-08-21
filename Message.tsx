import React from "react";

const Message = (props: any) => {
  console.log(props);
  return (
    <>
      <h2>Hello</h2>
      {props.children}
    </>
  );
};

export default Message;
