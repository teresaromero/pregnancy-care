import React from "react";
import { connect } from "react-redux";
import { clearMessages } from "../lib/redux/actions";

const _Messages = ({ messages, dispatch }) => {
  return (
    <div>
      {messages.map((m, i) => (
        <div className="notification" key={i}>
          <button className="delete" onClick={() => dispatch(clearMessages())} />
          {m}
        </div>
      ))}
    </div>
  );
};

export const Messages = connect(state => ({ messages: state.messages }))(
  _Messages
);
