import React from "react";
import Modal from "../components/Modal";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <React.Fragment>
      <Modal>
        <LoginForm />
      </Modal>
    </React.Fragment>
  );
};
