import React from "react";
import { connect } from "react-redux";
import { clearMessages } from "../lib/redux/actions";

const _Message = ({ messages, dispatch }) => {
  return (
    <div>
      {messages.map((m, i) => (
        <div class="notification" key={i}>
          <button class="delete" onClick={() => dispatch(clearMessages())} />
          {m}
        </div>
      ))}
    </div>
  );
};

export const Messages = connect(state => ({ messages: state.messages }))(
  _Message
);
