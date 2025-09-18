import "./RegisterModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  React.useEffect(() => {
    if (isOpen) {
      setEmail("");
      setAvatar("");
      setPassword("");
      setName("");
    }
  }, [isOpen]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  }
  return (
    <ModalWithForm
      title="Sign up"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
    >
      <label htmlFor="register__email_input" className="form__text-label">
        Email *
        <input
          id="register__text_input"
          type="email"
          className="form__text-input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register__password_input" className="form__text-label">
        Password *
        <input
          id="register__password_input"
          type="password"
          className="form__text-input"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="register__name_input" className="form__text-label">
        Name *
        <input
          id="register__name_input"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="garment__avatar_input" className="form__text-label">
        Avatar URL *
        <input
          id="garment__avatar_input"
          type="url"
          className="form__text-input"
          placeholder="Avatar"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
