import "./ItemModal.css";
import React from "react";

function ItemModal({ item, onClose, modalOpen }) {
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleClickOut = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };
    if (modalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOut);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOut);
    };
  }, [modalOpen]);
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      onClose;
    }
  });
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("form")) {
      onClose;
    }
  });

  if (modalOpen) {
    return (
      <div className={`modal ${modalOpen ? "modal-is-open" : ""}`}>
        <div className="modal__container">
          <button className="modal__close" onClick={onClose}></button>
          <img src={item.link} alt={item.name} className="modal__img" />
          <div className="modal__footer">
            <p className="modal__description">{item.name}</p>
            <p className="modal__weather-requirement">
              Weather: {item.weather}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemModal;
