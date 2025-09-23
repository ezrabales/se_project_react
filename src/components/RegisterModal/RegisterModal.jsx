import "./RegisterModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal, setLoginOpen }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    });
  }
  function handleLogInClick(e) {
    e.preventDefault();
    onCloseModal();
    setLoginOpen(true);
  }
  return (
    <ModalWithForm
      title="Sign up"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
      extraButton={
        <button className="form_extra-button" onClick={handleLogInClick}>
          or Log in
        </button>
      }
    >
      <label className="form__text-label">
        Email *
        <input
          id="register__text_input"
          name="email"
          type="email"
          className="form__text-input"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label className="form__text-label">
        Password *
        <input
          id="register__password_input-register"
          name="password"
          type="password"
          className="form__text-input"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label className="form__text-label">
        Name *
        <input
          id="register__name_input"
          name="name"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="form__text-label">
        Avatar URL *
        <input
          id="garment__avatar_input"
          name="avatar"
          type="url"
          className="form__text-input"
          placeholder="Avatar"
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
