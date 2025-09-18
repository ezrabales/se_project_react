import "./LoginModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onLogin, onCloseModal }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  React.useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }
  return (
    <ModalWithForm
      title="Sign in"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Sign In"
    >
      <label htmlFor="register__email_input" className="form__text-label">
        Email
        <input
          id="register__email_input"
          type="email"
          className="form__text-input"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register__password_input" className="form__text-label">
        Password
        <input
          id="register__password_input"
          type="password"
          className="form__text-input"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
