import "./LoginModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onLogin, onCloseModal, setRegisterOpen }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
  }
  function handleRegisterClick(e) {
    e.preventDefault();
    onCloseModal();
    setRegisterOpen(true);
  }
  return (
    <ModalWithForm
      title="Sign in"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Sign In"
      extraButton={
        <button className="form_extra-button" onClick={handleRegisterClick}>
          or Sign up
        </button>
      }
    >
      <label className="form__text-label">
        Email
        <input
          id="register__email_input"
          name="email"
          type="email"
          className="form__text-input"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label className="form__text-label">
        Password
        <input
          id="register__password_input-login"
          name="password"
          type="password"
          className="form__text-input"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
