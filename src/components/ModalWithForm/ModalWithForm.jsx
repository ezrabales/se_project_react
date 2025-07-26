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
        <button className="form__close" onClick={onClose}></button>
        <h2 className="form__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} className="form__form">
          {children}
          <label htmlFor="garment__name_input" className="form__text-label">
            Name
            <input
              id="garment__name_input"
              type="text"
              className="form__text-input"
              placeholder="Name"
            />
          </label>
          <label htmlFor="garment__image_input" className="form__text-label">
            Image URL
            <input
              id="garment__image_input"
              type="url"
              className="form__text-input"
              placeholder="Image"
            />
          </label>
          <div className="form__weather-options">
            Select the weather type:
            <label htmlFor="weather-option_hot" className="form__radio-label">
              <input
                id="weather-option_hot"
                type="radio"
                className="form__radio-input"
              />
              Hot
            </label>
            <label htmlFor="weather-option_warm" className="form__radio-label">
              <input
                id="weather-option_warm"
                type="radio"
                className="form__radio-input"
              />
              Warm
            </label>
            <label htmlFor="weather-option_cold" className="form__radio-label">
              <input
                id="weather-option_cold"
                type="radio"
                className="form__radio-input"
              />
              Cold
            </label>
          </div>

          <button type="submit" className="form__submit">
            {buttonText}Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
