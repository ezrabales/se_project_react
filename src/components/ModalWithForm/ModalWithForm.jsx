import "./ModalWithForm.css";
import React from "react";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  formOpen,
}) {
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleClickOut = (e) => {
      if (e.target.classList.contains("form")) {
        onClose();
      }
    };
    if (formOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOut);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOut);
    };
  }, [formOpen]);
  return (
    <div className={`form form_type_${name} ${formOpen ? "form-is-open" : ""}`}>
      <div className="form__container">
        <button className="form__close" onClick={onClose} />
        <h2 className="form__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} className="form__form">
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
