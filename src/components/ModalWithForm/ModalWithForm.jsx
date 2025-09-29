import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  formOpen,
  extraButton = "",
}) {
  useModalClose(formOpen, onClose);
  return (
    <div
      className={`modal form form_type_${name} ${
        formOpen ? "form-is-open" : ""
      }`}
    >
      <div className="form__container">
        <button className="form__close" onClick={onClose} />
        <h2 className="form__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} className="form__form">
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
          {extraButton}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
